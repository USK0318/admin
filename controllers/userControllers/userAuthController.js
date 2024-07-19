const user = require("../../models/userModel.js");
const blog = require("../../models/blogModel.js");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(422).json({ message: "Credentials are missing" });
      }
      const userExistsByEmail = await user.findOne({ email });
      const userExistsByusername = await user.findOne({ username });
      if (userExistsByEmail) {
        return res.status(409).json({ message: "Email already exists please login" });
      }
      if (userExistsByusername) {
        return res.status(403).json({ message: "username already exists please login" });
      }
      const validPassword = isValidPassword(password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const newUser = new user({ username, email, password });
      if (!newUser) {
        return res.status(404).json({ message: "Failed to create a user" });
      }
      await newUser.save()
      return res.status(200).json({ message: "Account created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  },
  allBlogs: async (req, res) => {
    try {
      const allblogs = await blog.find().sort({ createdAt: -1 });
      const recentBlogs = await blog.find().sort({ createdAt: -1 }).limit(5);
      // const allBlogs = allblogs.map((data) => {
      //   return { title: data.title, date: data.date, mainPic: data.mainPic, mainContent: data.mainContent }
      // });
      // const allRecentBlogs = recentBlogs.map((data) => {
      //   return { title: data.title, date: data.date, subPicOne: data.subPicOne }
      // });
      return res.status(200).json({ allblogs, recentBlogs });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "internal server error" });
    }
  },
  // singleBlog: async (req, res) => {
  //   try {
  //     const title = req.params.title;
  //     if (!title) {
  //       return res.status(400).json({ message: "invalid blog id" });
  //     }
  //     const blogData = await blog.findOne({ title: title });
  //     const recentBlogs = await blog.find().sort({ createdAt: -1 }).limit(5);
  //     const allRecentBlogs = recentBlogs.map((data) => {
  //       return { title: data.title, date: data.date, subPicOne: data.subPicOne }
  //     });
  //     if (!blogData) {
  //       return res.status(404).json({ message: "invalid blog data" });
  //     }
  //     return res.status(200).json({ blogData, allRecentBlogs });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).json({ message: "internal server error" });
  //   }
  // },
  categoryBlog: async (req, res) => {
    const tag = req.params.tag;
    const categoryData = await blog.find({ tag: tag });
    const recentBlogs = await blog.find().sort({ createdAt: -1 }).limit(5);
    if (tag) {
      const CategoryData = categoryData.map((data) => {
        return { title: data.title, date: data.date, mainPic: data.mainPic, mainContent: data.mainContent }
      });
      const allRecentBlogs = recentBlogs.map((data) => {
        return { title: data.title, date: data.date, subPicOne: data.subPicOne }
      });
      return res.status(200).json({ allRecentBlogs, CategoryData });
    }
  }
}