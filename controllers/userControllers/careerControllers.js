const job = require('../../models/careerModel').career;
const applicant = require('../../models/careerModel').applicant;
const validate = require("../../middleware/validations")

async function jobs(req, res) {
    try {
        const jobs = await job.find();
        res.status(200).json(jobs);
    }catch(err) {
        res.status(500).json({message: err.message});
    }
}

async function category(req, res) {
    try {
        const categories = await job.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// async function deleteJob(req, res) {
//     try {
//         await job.findByIdAndDelete(req.params.id);
//         res.status(200).json({message: "Job Deleted"});
//     }
//     catch(err) {
//         res.status(400).json({message: err.message});
//     }
// }


// async function createJob(req, res) {
//     try {
//         const newJob = new job(req.body);
//         await newJob.save();
//         res.status(201).json(newJob);
//     }
//     catch(err) {
//         res.status(400).json({message: err.message});
//     }
// }

// async function updateJob(req, res) {
//     try {
//         const updatedJob = await job.findByIdAndUpdate
//         (req.params.id, req.body, {new: true});
//         res.status(200).json(updatedJob);
//     }
//     catch(err) {
//         res.status(400).json({message: err.message});
//     }
// }



async function jobBYId(req, res) {
    try {
        const jobs = await job.findById(req.params.id);
        res.status(200).json(jobs);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
}

async function jobByCategory(req, res) {
    try {
        const jobs = await job.find({category: req.params.category});
        res.status(200).json(jobs);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
}

async function applyJob(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const role = req.body.role;
    const resume = req.body.resume;
    const jobid = req.params.id;
    const contactvalidation = validate.validatrPhone(contact);
    if(contactvalidation) {
        return res.status(400).json({message: contactvalidation});
    }
    const emailvalidation = validate.validatrEmail(email);
    if(emailvalidation) {
        return res.status(400).json({message: emailvalidation});
    }
    const data = {name, email, contact, role, resume, jobid};

    try {
        const newApplicant = new applicant(data);
        await newApplicant.save();
        res.status(201).json(newApplicant);
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
}

// async function getapplicant(req, res) {
//     try {
//         const applicants = await applicant.find();
//         res.status(200).json(applicants);
//     }
//     catch(err) {
//         res.status(400).json({message: err.message});
//     }
// }

// async function deleteapplicant(req, res) {
//     try {
//         await applicant.findByIdAndDelete(req.params.id);
//         res.status(200).json({message: "Applicant Deleted"});
//     }
//     catch(err) {
//         res.status(400).json({message: err.message});
//     }
// }

module.exports = {
    jobs,
    jobBYId,
    jobByCategory,
    applyJob,
    category

    // deleteJob,
    // createJob,
    // getapplicant,
    // deleteapplicant
    // updateJob
}