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

    if (targetPost && loggedUser) {
      targetPost.likes.push(loggedUser._id); /* add like */
      await targetPost.save(); /*slavando post com novo like*/
    }
    return res.json(targetPost);
  }
};
