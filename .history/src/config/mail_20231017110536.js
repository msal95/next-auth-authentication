import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: process.env.SMTP_SECURE,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// send mail with defined transport object
export const sendEmail = async (to, subject, html) => {
  console.log(
    "🚀 ~ file: mail.js:19 ~ sendEmail ~ to, subject, html:",
    to,
    subject,
    html
  );
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
  console.log("🚀 ~ file: mail.js:26 ~ sendEmail ~ info:", info);

  return info?.messageId;
};
