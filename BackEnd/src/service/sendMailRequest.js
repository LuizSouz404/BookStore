const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

module.exports = async function main(to, subject, variables, path) {
  let account = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const templateFileContent = fs.readFileSync(path).toString('utf8');

  const mailTemplateParse = handlebars.compile(templateFileContent);
  const html = mailTemplateParse(variables);

  let info = await transporter.sendMail({
    to,
    subject,
    html,
    from: 'Livro Livre <noreplay@LI.com.br>',
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

