import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { promises as fs } from 'fs';
import path from 'path';
import { escapeHtml, isValidEmail } from '@/lib/email';

// Simple in-memory sliding-window rate limit to blunt spam/abuse via repeated
// submissions. Resets on server restart and is per-instance only.
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;
const SUBMIT_MAX_ATTEMPTS = 5;
const attemptsByIp = new Map();

function isRateLimited(ip) {
    const now = Date.now();
    const attempts = (attemptsByIp.get(ip) || []).filter((t) => now - t < SUBMIT_WINDOW_MS);
    attempts.push(now);
    attemptsByIp.set(ip, attempts);
    return attempts.length > SUBMIT_MAX_ATTEMPTS;
}

const MAX_NAME_LENGTH = 100;
const MAX_SUBJECT_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

export async function POST(request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many submissions. Please try again later.' },
                { status: 429 }
            );
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone') || 'Not provided';
        const subject = formData.get('subject') || 'New Submission from Website';
        const message = formData.get('message');
        const type = formData.get('type') || 'Contact'; // 'Contact' or 'Proposal'
        const file = formData.get('file');

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }
        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }
        if (name.length > MAX_NAME_LENGTH || subject.length > MAX_SUBJECT_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json(
                { error: 'One or more fields exceed the maximum allowed length' },
                { status: 400 }
            );
        }
        if (file && file instanceof File && file.size > MAX_ATTACHMENT_BYTES) {
            return NextResponse.json(
                { error: 'Attachment is too large (max 5MB)' },
                { status: 400 }
            );
        }

        // Configure Transporter
        const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
        const port = parseInt(process.env.EMAIL_PORT || '587');

        // Force secure based on port to avoid configuration errors
        // Port 465 -> secure: true
        // Port 587 -> secure: false (STARTTLS)
        const isSecure = port === 465;

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure: isSecure, // overrides env variable if port suggests otherwise
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Prepare attachment if exists
        let attachments = [];
        if (file && file instanceof File && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            attachments.push({
                filename: file.name,
                content: buffer
            });
        }

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message);
        const safeType = escapeHtml(type);

        // 1. Send Email to Admin
        const adminMailOptions = {
            from: `"${safeName}" <${process.env.EMAIL_USER}>`, // Sender address (must be authenticated user usually)
            replyTo: email,
            to: process.env.EMAIL_USER, // Admin receives it
            subject: `[${safeType}] ${safeSubject}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">New ${safeType} Submission</h2>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Phone:</strong> ${safePhone}</p>
                <p><strong>Subject:</strong> ${safeSubject}</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${safeMessage}</p>
                </div>
            </div>
        `,
            attachments: attachments
        };

        // 2. Send Confirmation Email to User
        const userMailOptions = {
            from: `"NJ Tech Studio" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Thank you for contacting NJ Tech Studio`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4f46e5;">Thanks for reaching out!</h2>
                <p>Hi ${safeName},</p>
                <p>We have received your ${safeType.toLowerCase()} inquiry. Our team will review your message and get back to you as soon as possible.</p>
                <br>
                <p>Best regards,</p>
                <p><strong>NJ Tech Studio Team</strong></p>
            </div>
        `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        // Save submission to JSON database
        try {
            const SUBMISSIONS_PATH = path.join(process.cwd(), 'app', 'data', 'submissions.json');
            let submissions = [];
            try {
                const dataStr = await fs.readFile(SUBMISSIONS_PATH, 'utf-8');
                submissions = JSON.parse(dataStr);
            } catch (err) {
                if (err.code !== 'ENOENT') throw err;
            }

            const newSubmission = {
                id: `sub_${Date.now()}`,
                name,
                email,
                phone,
                subject,
                message,
                type,
                createdAt: new Date().toISOString(),
                replied: false,
                replies: []
            };

            submissions.push(newSubmission);
            
            // Ensure directory exists
            await fs.mkdir(path.dirname(SUBMISSIONS_PATH), { recursive: true });
            await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
        } catch (dbError) {
            console.error('Failed to save submission to JSON DB:', dbError);
        }

        return NextResponse.json({ success: true, message: 'Emails sent successfully and submission saved' });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}
