const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false, required: false },
},
{
  timestamps: true
});

//register
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) { 
      next();
  }
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
});

//login
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
}


const user = mongoose.model("user", userSchema);

module.exports = user;