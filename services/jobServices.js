import AppDataSource from "../config/config.js";
import Job from "../entities/job.entity.js";
import JobValidation from "../validation/job.validation.js";
import UploadService from "./upload.service.js";

class JobService {
    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job);
    }

    async create(jobData, banner) {
        // Validate the job data against the JobValidation schema
        const { error } = JobValidation.validate(jobData);
        if (error) {
            // Throw an error if validation fails
            throw new Error(`Validation Error: ${error.details[0].message}`);
        }

        // Check if a job with the same title and company already exists in the repository
        const existingJob = await this.jobRepository.findOne({
            where: {
                title: jobData.title,
                company: jobData.company
            }
        });

        if (existingJob) {
            throw new Error("Job with this title and company already exists");
        }

        // If a banner is provided, upload it using the UploadService and store the URL and public ID
        if (banner) {
            const uploadResult = await UploadService.uploadFile(banner);
            jobData.banner = uploadResult.url;
            jobData.bannerPublicId = uploadResult.publicId;
        }

        // Create a new job entity and save it to the repository
        const job = this.jobRepository.create(jobData);
        return await this.jobRepository.save(job);
    }
// This method asynchronously retrieves all job records from the job repository.
    async findAll() {
        return await this.jobRepository.find();
    }
// This method asynchronously retrieves a job record by its unique ID from the job repository.
    async findById(id) {
        return await this.jobRepository.findOne({ where: { id } });
    }

    // This method asynchronously updates an existing job record by its ID with new data and a banner (if provided).
    async update(id, jobData, banner) {
        const { error } = JobValidation.validate(jobData);
        if (error) {
            throw new Error(`Validation Error: ${error.details[0].message}`);
        }

        // Check if the job exists; if not, throw an error
        const existingJob = await this.findById(id);
        if (!existingJob) {
            throw new Error("Job not found");
        }

        // If a new banner is provided, delete the old one and upload the new banner
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
        // Retrieve the job record by ID
        const job = await this.findById(id);
        if (!job) {
            throw new Error("Job not found");
        }
        // Check if the job has a banner before attempting to delete
        if (!job.bannerPublicId) {
            throw new Error("No banner exists for this job");
        }
        // Delete the banner file from the storage service
        await UploadService.deleteFile(job.bannerPublicId);

        // Update the job record to remove banner details
        await this.jobRepository.update(id, {
            banner: null,
            bannerPublicId: null
        });

        // Return the updated job record
        return this.findById(id);
    }
}

export default new JobService();
