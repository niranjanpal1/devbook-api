const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: `"DevBook OTP" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'DevBook - Tor OTP Code 🔥',
        html: `
            <div style="font-family: Arial; padding: 20px;">
                <h2>DevBook Registration</h2>
                <p>Tor OTP Code:</p>
                <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
                <p>Ei code 10 minute por expire hoye jabe.</p>
                <p>Jodi tui request na kore thakis, ignore kor.</p>
            </div>
        `
    };
    await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
