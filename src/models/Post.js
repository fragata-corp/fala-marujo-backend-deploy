const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    likes: [
      {
        type: String
      }
    ],
    dislikes: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("Post", PostSchema);
