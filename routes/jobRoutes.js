import express from 'express';
import JobController from '../controllers/job.controller.js';
//import { authenticateUser } from '../middlewares/auth.middleware.js';
//import { checkRole } from '../middlewares/roleCheck.js';

const router = express.Router();

router.post('/', 
  (req, res) => JobController.create(req, res)
);

router.get('/', (req, res) => JobController.findAll(req, res));
router.get('/:id', (req, res) => JobController.findById(req, res));

router.put('/:id', 
  (req, res) => JobController.update(req, res)
);

router.delete('/:id', 
  (req, res) => JobController.delete(req, res)
);

export default router;