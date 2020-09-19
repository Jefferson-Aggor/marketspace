const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
dotenv.config();

sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);
const sendEmail = async (options) => {
  try {
    let mailOptions = {
      from: process.env.SENDGRID_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    await sgMail.send(mailOptions);
    console.log("mail has been sent");
  } catch (err) {
    console.log(err.response.body.errors);
  }
};

module.exports = sendEmail;
