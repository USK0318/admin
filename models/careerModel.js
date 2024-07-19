const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
    title: { type: String },
    experance: { type: Number },
    category: { type: String },
    jobdiscription: { type: String },
    salary: { type: Number },
    salaryReview: { type: String },
    workingHours: { type: String },
    workingdays: { type: String },
    weekend: { type: String },
    location: { type: String },
    jobtype: { type: String },
    vacancy: { type: Number },
    contact: { type: String },
    email: { type: String },
    applicatons: { type: Array }
    },
    {
        timestamps: true
    });

const career = mongoose.model("career", careerSchema);

const applicantSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    role: { type: String },
    resume: { type: String },
    jobid:{ type: String }
    },
    {
        timestamps: true
    });

const applicant = mongoose.model("applicant", applicantSchema);

module.exports = {
    career,
    applicant
}
