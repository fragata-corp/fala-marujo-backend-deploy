const User = require("../models/User");
const Email = require("../services/Email");
const generatePassword = require("password-generator");
module.exports = {
  async index(req, res) {
    const user = await User.find(); // remover o password do retorno
    return res.json(
      user.map(use => ({
        _id: use._id,
        name: use.name,
        email: use.email,
        fone: use.fone,
        avatar: use.avatar,
        address: use.address
      }))
    );
  },
  async show(req, res) {
    const user = await User.findById(req.params.id);
    return res.json({
      _id: user._id,
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
        const passwordTemp = generatePassword(12, false);
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: passwordTemp,
          bio: req.body.bio,
          fone: req.body.fone,
          address: req.body.address,
          avatar: req.body.avatar
        });

        if (user) {
          Email.Send({ email: user.email, senha: passwordTemp }).then(() => {
            return res.json({
              ok: true,
              message:
                "Usuário cadastrado com sucesso!! Verifique sua caixa de e-mail para continuar"
            });
          });
        }
      }
      return res.status(500).json({ error: "Usuário indisponivel" });
    }
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
      return res.json({ _id: user._id, name: user.name });
    } catch (error) {
      return res.status(404).json({ error: "Usuario ou senha invalida!!" });
    }
  },

  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(
      /*user.map(use => ({
        _id: use._id,
        name: use.name,
        email: use.email,
        fone: use.fone,
        avatar: use.avatar,
        address: use.address
      }))*/
      user
    );
  },

  async destroy(req, res) {
    await User.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
