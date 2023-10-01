import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// send mail with defined transport object
export const sendEmail = async (to, subject, html) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  });
};
