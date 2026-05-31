const nodemailer = require('nodemailer');

const sendOTP = async (email, otp, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `DevBook <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'DevBook - Email Verification OTP',
      html: `
        <div style="font-family: Arial; padding: 20px; background: #f4f4f4;">
          <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #1877f2; margin-top: 0;">Hi ${name},</h2>
            <p style="color: #333; font-size: 16px;">DevBook a account verify korar jonno ei OTP ta use kor:</p>
            <div style="background: #f0f2f5; padding: 20px; border-radius: 8px; text-align: center; margin: 25px 0;">
              <h1 style="color: #1877f2; letter-spacing: 8px; margin: 0; font-size: 36px;">${otp}</h1>
            </div>
            <p style="color: #666;">Ei OTP ta <strong>10 minute</strong> er jonno valid.</p>
            <p style="color: #e41e3f; font-size: 13px; background: #fff1f0; padding: 10px; border-radius: 5px;">⚠️ Karo sathe share korbi na. DevBook team kokhono OTP chay na.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #999; text-align: center;">DevBook Team</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('OTP send failed');
  }
};

module.exports = sendOTP;
