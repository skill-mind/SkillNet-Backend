import JobService from "../services/jobServices.js";

class JobController {
    constructor() {
        this.jobService = JobService;
    }

    async create(req, res) {
        try {
            const job = await this.jobService.create(req.body, req.file);
            res.status(201).json(job);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const jobs = await this.jobService.findAll();
            res.json(jobs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const job = await this.jobService.findById(req.params.id);
            if (!job) {
                return res.status(404).json({ error: "Job not found" });
            }
            res.json(job);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const job = await this.jobService.update(
                req.params.id,
                req.body,
                req.file
            );
            res.json(job);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await this.jobService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteBanner(req, res) {
        try {
            const job = await this.jobService.deleteBanner(req.params.id);
            res.json(job);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new JobController();
