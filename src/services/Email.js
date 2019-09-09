/**
 * habilite o seu gmail para enviar emails atraves desse link https://myaccount.google.com/lesssecureapps
 */
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = {
  async Send(email, senha) {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: process.env.MAIL_SERVICE,
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD
        }
      })
    );
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Confirmação de login",
      text: `Sua senha é ${senha}`
    };

    await transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  }
};
