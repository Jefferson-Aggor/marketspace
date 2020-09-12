const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const sendEmail = async (options) => {
  const transporter = await nodemailer.createTransport({
    service: process.env.NODEMAILER_HOST,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: `${process.env.NODEMAILER_NAME}`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("mail has been sent", info.messageId);
};

module.exports = sendEmail;
