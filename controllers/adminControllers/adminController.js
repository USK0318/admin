const blog = require("../../models/blogModel.js");
const job = require('../../models/careerModel').career;
const applications = require('../../models/careerModel').applicant;
const validate = require("../../middleware/validations.js")


const AWS = require("aws-sdk");
const path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { application } = require("express");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

module.exports = {
  dashboard: async (req, res) => {
    const blogData = await blog.find().countDocuments();
    try {
      res.render("dashboard", {
        blogData: blogData,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      req.flash("error", "internal server error");
      return res.redirect("/admin/dashboard");
    }
  },
  blogPage: async (req, res) => {
    try {
      return res.render("blogpage", {
        success: req.flash("success"),
        error: req.flash("error")
      });
    } catch (error) {
      req.flash("error", "internal server error");
      return res.redirect("/admin/dashboard");
    }
  },
  addBlog: async (req, res) => {
    try {
      const { title, tag, date, mainContent, subContent, additionalTitle1, additionalContent1, additionalTitle2, additionalContent2, additionalTitle3, additionalContent3, additionalTitle4, additionalContent4, additionalTitle5, additionalContent5, additionalTitle6, additionalContent6, additionalTitle7, additionalContent7, additionalTitle8, additionalContent8, additionalTitle9, additionalContent9, additionalTitle10, additionalContent10 } = req.body;
      const mainPic = req.files.mainPic;
      const subPicOne = req.files.subPicOne;
      const subPicTwo = req.files.subPicTwo;
      const mainPicName = uuidv4() + path.extname(mainPic.name);
      const subPicOneName = uuidv4() + path.extname(subPicOne.name);
      const subPicTwoName = uuidv4() + path.extname(subPicTwo.name);
      mainPic.mv(`./uploadings/${mainPicName}`);
      subPicOne.mv(`./uploadings/${subPicOneName}`);
      subPicTwo.mv(`./uploadings/${subPicTwoName}`);
      const data = await blog.create({ title, tag, mainPic: `/uploadings/${mainPicName}`, date: date, mainContent: mainContent, subPicOne: `/uploadings/${subPicOneName}`, subPicTwo: `/uploadings/${subPicTwoName}`, subContent, additionalTitle1, additionalContent1, additionalTitle2, additionalContent2, additionalTitle3, additionalContent3, additionalTitle4, additionalContent4, additionalTitle5, additionalContent5, additionalTitle6, additionalContent6, additionalTitle7, additionalContent7, additionalTitle8, additionalContent8, additionalTitle9, additionalContent9, additionalTitle10, additionalContent10 });
      if (!data) {
        req.flash("error", "error while creating a blog");
        return res.redirect("/admin/blogpage");
      }
      req.flash("success", "blog created successfully");
      // return res.redirect(`/admin/blogpage`);
      return res.redirect(`/admin/blog/${data._id}`);
    } catch (error) {
      console.log(error);
      req.flash("error", "internal server error");
      return res.redirect("/admin/dashboard");
    }
  },
  allBlogs: async (req, res) => {
    try {
      const blogData = await blog.find().sort({ createdAt: -1 });
      res.render("allBlogs", {
        blog: blogData,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      req.flash("error", "internal server error");
      return res.redirect("/admin/dashboard");
    }
  },
  singleBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      const blogData = await blog.findById(blogId);
      if (!blogData) {
        req.flash("error", "invalid blog");
        return res.redirect("/admin/allblogs");
      }
      // console.log(blogData);
      return res.render("singleBlog", {
        blog: blogData,
        success: req.flash("success"),
        error: req.flash("error")
      })
    } catch (error) {
      console.log(error);
      req.flash("error", "internal server error");
      return res.redirect("/admin/dashboard");
    }
  },
  updateBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      const { title, tag, date, mainContent, subContent, additionalTitle1, additionalContent1, additionalTitle2, additionalContent2, additionalTitle3, additionalContent3, additionalTitle4, additionalContent4, additionalTitle5, additionalContent5, additionalTitle6, additionalContent6, additionalTitle7, additionalContent7, additionalTitle8, additionalContent8, additionalTitle9, additionalContent9, additionalTitle10, additionalContent10 } = req.body
      const { mainPic, subPicOne, subPicTwo } = req.files || {};
      const blogData = await blog.findById(blogId);
      if (!blogData) {
        req.flash("error", "Invalid Blog");
        return res.redirect("/admin/allblogs");
      }
      blogData.title = title || blogData.title;
      blogData.tag = tag || blogData.tag;
      blogData.date = date || blogData.date;
      blogData.mainContent = mainContent || blogData.mainContent;
      blogData.subContent = subContent || blogData.subContent;
      blogData.additionalTitle1 = additionalTitle1 || blogData.additionalTitle1;
      blogData.additionalTitle2 = additionalTitle2 || blogData.additionalTitle2;
      blogData.additionalTitle3 = additionalTitle3 || blogData.additionalTitle3;
      blogData.additionalTitle4 = additionalTitle4 || blogData.additionalTitle4;
      blogData.additionalTitle5 = additionalTitle5 || blogData.additionalTitle5;
      blogData.additionalTitle6 = additionalTitle6 || blogData.additionalTitle6;
      blogData.additionalTitle7 = additionalTitle7 || blogData.additionalTitle7;
      blogData.additionalTitle8 = additionalTitle8 || blogData.additionalTitle8;
      blogData.additionalTitle9 = additionalTitle9 || blogData.additionalTitle9;
      blogData.additionalTitle10 = additionalTitle10 || blogData.additionalTitle10;
      blogData.additionalContent1 = additionalContent1 || blogData.additionalContent1;
      blogData.additionalContent2 = additionalContent2 || blogData.additionalContent2;
      blogData.additionalContent3 = additionalContent3 || blogData.additionalContent3;
      blogData.additionalContent4 = additionalContent4 || blogData.additionalContent4;
      blogData.additionalContent5 = additionalContent5 || blogData.additionalContent5;
      blogData.additionalContent6 = additionalContent6 || blogData.additionalContent6;
      blogData.additionalContent7 = additionalContent7 || blogData.additionalContent7;
      blogData.additionalContent8 = additionalContent8 || blogData.additionalContent8;
      blogData.additionalContent9 = additionalContent9 || blogData.additionalContent9;
      blogData.additionalContent10 = additionalContent10 || blogData.additionalContent10;
      console.log(additionalTitle1, additionalContent1, additionalTitle2, additionalContent2, additionalTitle3, additionalContent3, additionalTitle4, additionalContent4, additionalTitle5, additionalContent5, additionalTitle6, additionalContent6, additionalTitle7, additionalContent7, additionalTitle8, additionalContent8, additionalTitle9, additionalContent9, additionalTitle10, additionalContent10)
      if (mainPic) {
        const mainPicName = uuidv4() + path.extname(mainPic.name);
        await mainPic.mv(`./uploadings/${mainPicName}`);
        blogData.mainPic = `/uploadings/${mainPicName}`;
      }
      if (subPicOne) {
        const subPicOneName = uuidv4() + path.extname(subPicOne.name);
        await subPicOne.mv(`./uploadings/${subPicOneName}`);
        blogData.subPicOne = `/uploadings/${subPicOneName}`;
      }
      if (subPicTwo) {
        const subPicTwoName = uuidv4() + path.extname(subPicTwo.name);
        await subPicTwo.mv(`./uploadings/${subPicTwoName}`);
        blogData.subPicTwo = `/uploadings/${subPicTwoName}`;
      }
      await blogData.save();
      req.flash("success", "successfully updated");
      return res.redirect(`/admin/blog/${blogId}`);
    } catch (error) {
      console.log(error);
      req.flash("error", "internal server error");
      return res.redirect("/admin/dashboard");
    }
  },
  deleteBlog: async (req, res) => {
    const blogId = req.params.id;
    const blogData = await blog.findById(blogId);
    if (!blogData) {
      req.flash("error", "invalid blog");
      return res.redirect("/admin/allblogs")
    }
    const images = [blogData.mainPic, blogData.subPicOne, blogData.subPicTwo];
    images.forEach(imageUrl => {
      if (imageUrl) {
        const filename = imageUrl.split('/uploadings/')[1];
        const imagePath = path.join(__dirname, '..', '..', 'uploadings', filename);
        if (fs.existsSync(imagePath)) {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log("Failed to delete image:");
              return;
            } else {
              // console.log("Successfully deleted image:", imagePath);
            }
          });
        } else {
          console.log("File does not exist:");
          return ``
        }
      }
    });
    await blog.findByIdAndDelete(blogId);
    req.flash("success", "blog deleted successfully");
    return res.redirect("/admin/allblogs");
  
  },

  // career routes


career : async (req, res) => {
    try {
      const jobs = await job.find();
      return res.render("career", {jobs: jobs});
    }catch(err) {
      res.status(500).json({message: err.message});
    }
  },
  deleteCareer: async (req, res) => {
    try {
      await job.findByIdAndDelete(req.params.id);
      res.redirect("/admin/career");
    }catch(err) {
      res.status(500).json({message: err.message});
    }
  },

  onejob: async (req, res) => {
    try {
      const jobs = await job.findById(req.params.id);
      return res.render("singleCareer", {jobs: jobs});
    }
    catch(err) {
      res.status(400).json({message: err.message});
    }
  },
  
  addJob: async (req, res) => {
    try {
      return res.render("addJob");
    }catch(err) {
      res.status(500).json({message: err.message});
    }
  },

  addJobPost: async (req, res) => {
    console.log(req.body);
    try {
      const jobdata = req.body;
      jobdata.salary = parseInt(jobdata.salary);
      jobdata.experance = parseInt(jobdata.experance);
      jobdata.vacancy = parseInt(jobdata.vacancy);
      const phone = jobdata.contact;

      const phonevalidation = validate.validatrPhone(phone);
      if (phonevalidation) {
        console.log(phonevalidation);
        // req.flash("error", phonevalidation);
        return res.render("addJob", {messageerror: phonevalidation, jobs: jobdata});
      }
      const emailvalidation = validate.validatrEmail(jobdata.email);
      if (emailvalidation) {
        console.log(emailvalidation);
        // req.flash("error", emailvalidation);
        return res.render("addJob", {messageerror: emailvalidation, jobs: jobdata});
      }

      const data = await job.create(jobdata);
    
      if (!data) {
        // req.flash("error", "error while creating a job");
        return res.render("addJob", {messageerror: "error while creating a job",  jobs: jobdata});
      }
      // req.flash("success", "job created successfully");
      return res.render("addJob", {message: "Job Created Successfully"});
    }catch(err) {
      // req.flash("error", "internal server error");
      return res.render("addJob", {messageerror: "internal server error", jobs: jobdata});
    }
  },
  updateJob: async (req, res) => {
    try {
      const one= await job.findById(req.params.id);
      const data = req.body;
      const id = req.params.id;
      req.body.salary = parseInt(req.body.salary);
      req.body.experance = parseInt(req.body.experance);
      req.body.vacancy = parseInt(req.body.vacancy);
      const phone = req.body.contact;
      const phonevalidation = validate.validatrPhone(phone);
      if (phonevalidation) {
        req.flash("error", phonevalidation);
        return res.render("singleCareer", {jobs: one,messageerror:phonevalidation});
      }
      const emailvalidation = validate.validatrEmail(req.body.email);
      if (emailvalidation) {
        req.flash("error", emailvalidation);
        return res.render("singleCareer", {jobs: one,messageerror:emailvalidation});
      }
      const jobs = await job.findByIdAndUpdate(id, data);
      const updatedJob = await job.findById(id);
      return res.render("singleCareer", {jobs: updatedJob,message: "Job Updated Successfully"});
    }catch(err) {
      res.status(500).json({messageerror: err.message});
    }
  },
  applications: async (req, res) => {
    const id = req.params.id;
    try {
      const jobs = await applications.find({jobid: id});
      return res.render("applications",{applications: jobs});
    }catch(err) {
      res.status(500).json({message: err.message});
    }
  }

}