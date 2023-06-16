import * as nodemailer from 'nodemailer';

export default async function sendEmail(email: string) {
  const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: 2525,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  const subject = 'User payever enroll';
  const message = 'Congratulations, your payever challenge has been evaluated';

  await transport.sendMail({
    from: process.env.MAILER_FROM,
    to: email,
    subject,
    text: message,
  });
}
