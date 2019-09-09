const User = require("../models/User");
const Post = require("../models/Post");
module.exports = {
  async store(req, res) {
    const { user } = req.headers; /*ID do usuário que envia o dislike */
    const { postId } = req.params; /*ID do post que recebe o dislike */

    const loggedUser = await User.findById(
      user
    ); /*Retorna os dados do usuario logado*/
    const targetPost = await Post.findById(
      postId
    ); /*Retorna os dados do post alvo*/

    if (targetPost && loggedUser) {
      targetPost.dislikes.push(loggedUser._id); /* add dislike */
      await targetPost.save(); /*slavando post com novo dislike*/
    }

    return res.json(targetPost);
  }
};
