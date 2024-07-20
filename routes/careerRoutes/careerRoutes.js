const express = require('express');
const careerRouter = express.Router();

const careerController = require('../../controllers/userControllers/careerControllers');

careerRouter.get('/jobs', careerController.jobs);
// careerRouter.delete('/jobs/:id', careerController.deleteJob);
// careerRouter.post('/jobs', careerController.createJob);
// careerRouter.put('/jobs/:id', careerController.updateJob);
careerRouter.get('/job/:id', careerController.jobBYId);
careerRouter.get('/jobs/:category', careerController.jobByCategory);

careerRouter.get('/category', careerController.category);

careerRouter.post('/apply/:id', careerController.applyJob);
careerRouter.get('/applications', careerController.getapplicant);
// careerRouter.delete('/applications/:id', careerController.deleteapplicant);

module.exports = careerRouter;