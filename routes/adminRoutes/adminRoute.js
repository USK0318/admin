const adminRouter = require("express").Router();
const adminController = require("../../controllers/adminControllers/adminController.js");

adminRouter.get("/dashboard", adminController.dashboard);
adminRouter.get("/allblogs", adminController.allBlogs);
adminRouter.get("/blogpage", adminController.blogPage);
adminRouter.post("/addblog", adminController.addBlog);
adminRouter.get("/blog/:id", adminController.singleBlog);
adminRouter.post("/updateblog/:id", adminController.updateBlog);
adminRouter.get("/delblog/:id", adminController.deleteBlog);

// career routes
adminRouter.get("/career", adminController.career);
adminRouter.get("/onecareer/:id", adminController.onejob);
adminRouter.get("/deletecareer/:id", adminController.deleteCareer);
adminRouter.get("/addjob", adminController.addJob);
adminRouter.post("/addjobpost", adminController.addJobPost);
adminRouter.post("/updatejobs/:id", adminController.updateJob);

adminRouter.get("/applications/:id", adminController.applications);

module.exports = adminRouter;