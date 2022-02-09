const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  // To activate gmail, use "less secure app" option
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: 'Tincho <hello@tincho.com>',
    to: email,
    subject: subject,
    text: message,
    // html
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
