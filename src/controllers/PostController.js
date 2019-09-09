const Post = require("../models/Post");

module.exports = {
  async index(req, res) {
    const post = await Post.find();

    return res.json(post);
  },
  async show(req, res) {
    const post = await Post.findById(req.params.id);
    return res.json(post);
  },

  async store(req, res) {
    if (req.headers.user) {
      const userExist = await User.findById(req.headers.user);
      const data = req.body;
      if (userExist && data) {
        const post = await Post.create({
          title: data.title,
          description: data.description,
          url: data.url,
          avatar: data.avatar,
          author: "5d765cf6f140480021a5f3ab"
        });
        return res.json(post);
      }
    }
  },
  async update(req, res) {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(post);
  },
  async destroy(req, res) {
    await Post.findByIdAndRemove(req.params.id);

    return res.send();
  }
};
