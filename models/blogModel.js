const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const blogSchema = new mongoose.Schema({
  title: { type: String },
  tag: { type: String },
  mainPic: { type: String },
  date: { type: String },
  mainContent: { type: String },
  subPicOne: { type: String },
  subPicTwo: { type: String },
  subContent: { type: String },
  additionalTitle1: { type: String },
  additionalContent1: { type: String },
  additionalTitle2: { type: String },
  additionalContent2: { type: String },
  additionalTitle3: { type: String },
  additionalContent3: { type: String },
  additionalTitle4: { type: String },
  additionalContent4: { type: String },
  additionalTitle5: { type: String },
  additionalContent5: { type: String },
  additionalTitle6: { type: String },
  additionalContent6: { type: String },
  additionalTitle7: { type: String },
  additionalContent7: { type: String },
  additionalTitle8: { type: String },
  additionalContent8: { type: String },
  additionalTitle9: { type: String },
  additionalContent9: { type: String },
  additionalTitle10: { type: String },
  additionalContent10: { type: String }
},
  {
    timestamps: true
  });

const blog = mongoose.model("blog", blogSchema);

module.exports = blog;