import AppDataSource from "../config/config.js";
import Job from "../entities/job.entity.js";
import JobValidation from "../validation/job.validation.js";
import UploadService from "./upload.service.js";

class JobService {
    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job);
    }

    async create(jobData, banner) {
        const { error } = JobValidation.validate(jobData);
        if (error) {
            throw new Error(`Validation Error: ${error.details[0].message}`);
        }

        const existingJob = await this.jobRepository.findOne({
            where: {
                title: jobData.title,
                company: jobData.company
            }
        });

        if (existingJob) {
            throw new Error("Job with this title and company already exists");
        }

        if (banner) {
            const uploadResult = await UploadService.uploadFile(banner);
            jobData.banner = uploadResult.url;
            jobData.bannerPublicId = uploadResult.publicId;
        }

        const job = this.jobRepository.create(jobData);
        return await this.jobRepository.save(job);
    }

    async findAll() {
        return await this.jobRepository.find();
    }

    async findById(id) {
        return await this.jobRepository.findOne({ where: { id } });
    }

    async update(id, jobData, banner) {
        const { error } = JobValidation.validate(jobData);
        if (error) {
            throw new Error(`Validation Error: ${error.details[0].message}`);
        }

        const existingJob = await this.findById(id);
        if (!existingJob) {
            throw new Error("Job not found");
        }

        if (banner) {
            // Delete old banner if exists
            if (existingJob.bannerPublicId) {
                await UploadService.deleteFile(existingJob.bannerPublicId);
            }

            // Upload new banner
            const uploadResult = await UploadService.uploadFile(banner);
            jobData.banner = uploadResult.url;
            jobData.bannerPublicId = uploadResult.publicId;
        }

        await this.jobRepository.update(id, jobData);
        return this.findById(id);
    }

    async delete(id) {
        const job = await this.findById(id);
        if (!job) {
            throw new Error("Job not found");
        }

        // Delete banner if exists
        if (job.bannerPublicId) {
            await UploadService.deleteFile(job.bannerPublicId);
        }

        return await this.jobRepository.delete(id);
    }

    async deleteBanner(id) {
        const job = await this.findById(id);
        if (!job) {
            throw new Error("Job not found");
        }

        if (!job.bannerPublicId) {
            throw new Error("No banner exists for this job");
        }

        await UploadService.deleteFile(job.bannerPublicId);

        await this.jobRepository.update(id, {
            banner: null,
            bannerPublicId: null
        });

        return this.findById(id);
    }
}

export default new JobService();
