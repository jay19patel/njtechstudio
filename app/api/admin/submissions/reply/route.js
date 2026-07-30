import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { verifyRequest } from '@/lib/auth';
import { escapeHtml } from '@/lib/email';

const SUBMISSIONS_PATH = path.join(process.cwd(), 'app', 'data', 'submissions.json');

export async function POST(request) {
  try {
    // 1. Verify admin session
    const isAuthenticated = verifyRequest(request);
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin session required' },
        { status: 401 }
      );
    }

    // 2. Parse arguments
    const { submissionId, replyMessage } = await request.json();
    if (!submissionId || !replyMessage) {
      return NextResponse.json(
        { error: 'Submission ID and reply message are required' },
        { status: 400 }
      );
    }

    // 3. Read submissions database
    let submissions = [];
    try {
      const dataStr = await fs.readFile(SUBMISSIONS_PATH, 'utf-8');
      submissions = JSON.parse(dataStr);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    // 4. Find the matching submission
    const submissionIndex = submissions.findIndex(sub => sub.id === submissionId);
    if (submissionIndex === -1) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const submission = submissions[submissionIndex];

    // 5. Send SMTP Reply Email
    const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.EMAIL_PORT || '587');
    const isSecure = port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: isSecure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const replySubject = submission.subject.toLowerCase().startsWith('re:')
      ? submission.subject
      : `Re: ${submission.subject}`;

    const safeName = escapeHtml(submission.name);
    const safeReplyMessage = escapeHtml(replyMessage);
    const safeOriginalMessage = escapeHtml(submission.message);

    const mailOptions = {
      from: `"NJ Tech Studio" <${process.env.EMAIL_USER}>`,
      to: submission.email,
      subject: replySubject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #eeebff; padding-bottom: 10px;">Reply from NJ Tech Studio</h2>
          <p>Hi ${safeName},</p>
          <div style="background-color: #fcfcff; border-left: 4px solid #4f46e5; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; white-space: pre-wrap; font-size: 15px;">${safeReplyMessage}</div>

          <br>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

          <p style="color: #6b7280; font-size: 13px; margin-bottom: 5px;"><strong>On ${new Date(submission.createdAt).toLocaleString()}, you wrote:</strong></p>
          <blockquote style="margin: 0; border-left: 3px solid #d1d5db; padding-left: 15px; color: #4b5563; font-style: italic; white-space: pre-wrap; font-size: 14px;">${safeOriginalMessage}</blockquote>

          <br>
          <p style="margin-top: 20px;">Best regards,</p>
          <p><strong>NJ Tech Studio Team</strong></p>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 5px;">Web: <a href="https://njtechstudio.in" style="color: #4f46e5; text-decoration: none;">njtechstudio.in</a></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // 6. Update submission record in database
    const newReply = {
      id: `rep_${Date.now()}`,
      message: replyMessage,
      createdAt: new Date().toISOString()
    };

    if (!submission.replies) {
      submission.replies = [];
    }
    
    submission.replies.push(newReply);
    submission.replied = true;
    submission.updatedAt = new Date().toISOString();

    submissions[submissionIndex] = submission;

    // 7. Save database
    await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Reply email sent successfully and submission status updated',
      reply: newReply
    });

  } catch (error) {
    console.error('Submission Reply error:', error);
    return NextResponse.json(
      { error: 'Failed to send reply email', details: error.message },
      { status: 500 }
    );
  }
}
