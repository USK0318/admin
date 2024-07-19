const userAuthRouter = require("express").Router();
const userController = require("../../controllers/userControllers/userAuthController.js");

userAuthRouter.post("/register", userController.register);
userAuthRouter.get("/allblogs", userController.allBlogs);
// userAuthRouter.get("/blog/:title", userController.singleBlog);
userAuthRouter.get("/categoryblog/:tag", userController.categoryBlog);


module.exports = userAuthRouter;