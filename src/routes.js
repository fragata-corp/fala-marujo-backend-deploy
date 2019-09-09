const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

//Login

routes.post("/login", UserController.signIn);

//User
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

//Post
routes.get("/posts", PostController.index);
routes.get("/posts/:id", PostController.show); //id do post
routes.post("/posts", PostController.store); //id do usuario que fez o post
routes.put("/posts/:id", PostController.update); //id do post
routes.delete("/posts/:id", PostController.destroy); //id do post

//Like
routes.post("/posts/:postId/likes", LikeController.store);
routes.post("/posts/:postId/dislikes", DislikeController.store);

module.exports = routes;
