import nodemailer from "nodemailer";

// Support both SMTP_EMAIL and SMTP_USER (your .env uses SMTP_USER)
const getSenderEmail = () =>
  process.env.SMTP_EMAIL || process.env.SMTP_USER || "";

const sendMail1 = (
  htmlContent: string,
  receiverEmail: string,
  subject: string = "Mail From Sanradhya Bhowmik"
) => {
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const senderEmail = getSenderEmail();
  const password = process.env.SMTP_PASSWORD;

  if (!senderEmail || !password) {
    console.error(
      "SMTP credentials are missing. Set SMTP_USER (or SMTP_EMAIL), SMTP_PASSWORD, and optionally SMTP_HOST, SMTP_PORT."
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: senderEmail,
      pass: password,
    },
  });

  const fromName = process.env.SMTP_FROM_NAME || "Sanradhya Bhowmik";
  const mailOptions = {
    from: `"${fromName}" <${senderEmail}>`,
    to: receiverEmail,
    subject: subject,
    text: htmlContent,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error while sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
};

const sendMail2 = (
  htmlContent: string,
  receiverEmail: string,
  subject: string = "Mail From Sanradhya Bhowmik",
  senderName: string = "Sanradhya Bhowmik"
) => {
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const senderEmail = getSenderEmail();
  const password = process.env.SMTP_PASSWORD;

  if (!senderEmail || !password) {
    console.error(
      "SMTP credentials are missing. Set SMTP_USER (or SMTP_EMAIL), SMTP_PASSWORD, and optionally SMTP_HOST, SMTP_PORT."
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: senderEmail,
      pass: password,
    },
  });

  const fromName = process.env.SMTP_FROM_NAME || "Sanradhya Bhowmik";
  const mailOptions = {
    from: `"${fromName}" <${senderEmail}>`,
    to: senderEmail,
    replyTo: receiverEmail,
    subject,
    text: htmlContent,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending notification to host:", error);
      return;
    }
    console.log("Host notification sent:", info.response);
  });
};

export { sendMail1, sendMail2 };
