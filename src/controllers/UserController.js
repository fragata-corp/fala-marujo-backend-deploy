const User = require("../models/User");
const Email = require("../services/Email");
const generatePassword = require("password-generator");
module.exports = {
  async index(req, res) {
    const user = await User.find();
    return res.json({
      name: user.name,
      email: user.email,
      fone: user.fone,
      avatar: user.avatar,
      address: user.address
    });
  },
  async show(req, res) {
    const user = await User.findById(req.params.id);
    return res.json({
      name: user.name,
      email: user.email,
      fone: user.fone,
      avatar: user.avatar,
      address: user.address
    });
  },
  //Create user
  async store(req, res) {
    if (req.body.email) {
      const userExist = await User.findOne({ email: req.body.email });
      if (!userExist) {
        const user = await User.create(req.body);
        if (user) {
          Email.Send(user.email, user.password); //Enviar id do usuario no header da url
        }
        return res.json({
          ok: true,
          message:
            "Usuário cadastrado com sucesso!! Verifique sua caixa de e-mail para continuar"
        });
      }

      return res.json({ error: "Usuário indisponivel" });
    }

    return res.send(404);
  },

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      //Find the user given the email
      const user = await User.findOne({ email: email });
      //Check if the password is correct
      const isMatch = await user.isValidPassword(password);
      if (!user || !isMatch) {
        return res.status(404).json({ error: "Usuário ou senha invalida" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: "Usuario ou senha invalida!!" });
    }
  },

  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(user);
  },

  async destroy(req, res) {
    await User.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
