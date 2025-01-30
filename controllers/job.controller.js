import JobService from "../services/jobServices.js";

class JobController {
    constructor() {
        this.jobService = JobService;
    }

    async create(req, res) {
        try {
            // Call the job service to create a new job using request body and uploaded file
            const job = await this.jobService.create(req.body, req.file);
            // Respond with the created job data and a 201 status for successful creation
            res.status(201).json(job);
        } catch (error) {
            // Handle errors and return a 400 status with the error message
            res.status(400).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            // Retrieve all job records from the job service
            const jobs = await this.jobService.findAll();
            // Send the retrieved jobs as a JSON response
            res.json(jobs);
        } catch (error) {
            // Handle any errors and respond with a 500 status code 
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            // Retrieve the job by its ID from the jobService    
            const job = await this.jobService.findById(req.params.id);
            // If no job is found, return a 404 Not Found response
            if (!job) {
                return res.status(404).json({ error: "Job not found" });
            }
            // Send the found job as a JSON response
            res.json(job);
        } catch (error) {
            // Handle any server errors and return a 500 Internal Server
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            // Call the job service to update the job using the provided ID, request body, and optional file
            const job = await this.jobService.update(
                req.params.id,
                req.body,
                req.file
            );
            // Respond with the updated job details
            res.json(job);
        } catch (error) {
            // Handle errors and return a 400 status with the error message
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            // Call the job service to delete the job using the provided ID
            await this.jobService.delete(req.params.id);
            // Respond with a 204 status to indicate successful deletion with no content
            res.status(204).send();
        } catch (error) {
            // Handle errors and return a 400 status with the error message
            res.status(500).json({ error: error.message });
        }
    }

    async deleteBanner(req, res) {
        try {
            // Call the job service to delete the banner using the provided job ID
            const job = await this.jobService.deleteBanner(req.params.id);
            // Respond with the result of the deletion operation
            res.json(job);
        } catch (error) {
            // Handle any errors and return a 400 status with the error message
            res.status(400).json({ error: error.message });
        }
    }
}

export default new JobController();
