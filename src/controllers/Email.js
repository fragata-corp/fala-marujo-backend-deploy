/**
 * habilite o seu gmail para enviar emails atraves desse link https://myaccount.google.com/lesssecureapps
 */
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = {
  async Send(id) {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "SeuUser@gmail.com",
          pass: "SuaSenha"
        }
      })
    );
    const mailOptions = {
      from: "author@gmail.com",
      to: "quemRecebe@gmail.com",
      subject: "Confirmação de login",
      text: `Clique no link para tivar seu login: http://localhost:4000/users/active/${id}` //id do usuario criado
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
