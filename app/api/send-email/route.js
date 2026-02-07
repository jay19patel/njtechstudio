import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
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
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
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

        // 1. Send Email to Admin
        const adminMailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Sender address (must be authenticated user usually)
            replyTo: email,
            to: process.env.EMAIL_USER, // Admin receives it
            subject: `[${type}] ${subject}`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">New ${type} Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
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
                <p>Hi ${name},</p>
                <p>We have received your ${type.toLowerCase()} inquiry. Our team will review your message and get back to you as soon as possible.</p>
                <br>
                <p>Best regards,</p>
                <p><strong>NJ Tech Studio Team</strong></p>
            </div>
        `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        return NextResponse.json({ success: true, message: 'Emails sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email', details: error.message },
            { status: 500 }
        );
    }
}
