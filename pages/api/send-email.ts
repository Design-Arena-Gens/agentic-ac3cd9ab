import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, pdfBase64, fullName } = req.body;

    if (!email || !pdfBase64) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'demo') {
      return res.status(200).json({
        success: false,
        message: 'Email service not configured. Please set RESEND_API_KEY environment variable.'
      });
    }

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64.split(',')[1], 'base64');

    await resend.emails.send({
      from: 'Thần Số Học <onboarding@resend.dev>',
      to: email,
      subject: 'Báo Cáo Thần Số Học của bạn',
      html: `
        <h1>Xin chào ${fullName || 'bạn'},</h1>
        <p>Cảm ơn bạn đã sử dụng dịch vụ Thần Số Học của chúng tôi.</p>
        <p>Báo cáo chi tiết về thần số học của bạn được đính kèm trong email này.</p>
        <p>Chúc bạn có một ngày tốt lành!</p>
      `,
      attachments: [
        {
          filename: 'bao-cao-than-so-hoc.pdf',
          content: pdfBuffer,
        },
      ],
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Error sending email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
