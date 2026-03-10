import nodemailer from "nodemailer";

const sendMail1 = (
  htmlContent: string,
  receiverEmail: string,
  subject: string = "Mail From Margaret Graham"
) => {
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const senderEmail = process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASSWORD;

  if (!senderEmail || !password) {
    console.error(
      "SMTP credentials are missing. Please check your environment variables."
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

  const mailOptions = {
    from: `"Margaret Graham" <${senderEmail}>`,
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
  subject: string = "Mail From Margaret Graham",
  senderName: string = "Margaret Graham"
) => {
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const senderEmail = process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASSWORD;

  if (!senderEmail || !password) {
    console.error(
      "SMTP credentials are missing. Please check your environment variables."
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

  const mailOptions = {
    from: `"${senderName}" <${receiverEmail}>`,
    replyTo: receiverEmail,
    to: senderEmail,
    subject,
    text: htmlContent,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error while sending email:", error);
    }
    console.log(
      "From:",
      mailOptions.from,
      "Email sent successfully:",
      info.response
    );
  });
};

export { sendMail1, sendMail2 };
