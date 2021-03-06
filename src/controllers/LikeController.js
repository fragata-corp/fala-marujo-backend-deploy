const User = require("../models/User");
const Post = require("../models/Post");
module.exports = {
  async store(req, res) {
    const { user } = req.headers; /*ID do usuário que envia o like */
    const { postId } = req.params; /*ID do post que recebe o like */

    const loggedUser = await User.findById(
      user
    ); /*Retorna os dados do usuario logado*/
    const targetPost = await Post.findById(
      postId
    ); /*Retorna os dados do post alvo*/
    if (!targetPost) {
      return res.status(400).json({
        error: "Post not exists"
      }); /*caso o usuario não exista retorne o status de error*/
    }

    if (!targetPost.likes.includes(loggedUser._id)) {
      targetPost.likes.push(loggedUser._id); /* add like */
      await targetPost.save(); /*slavando user com novo like*/
    }
    return res.json(targetPost);
  }
};
