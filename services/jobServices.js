import AppDataSource from '../config/config.js';
import Job from '../entities/job.entity.js';
import JobValidation from '../validation/job.validation.js';

class JobService {
  constructor() {
    this.jobRepository = AppDataSource.getRepository(Job);
  }

  async create(jobData) {
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
      throw new Error('Job with this title and company already exists');
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

  async update(id, jobData) {
    const { error } = JobValidation.validate(jobData);
    if (error) {
      throw new Error(`Validation Error: ${error.details[0].message}`);
    }

    await this.jobRepository.update(id, jobData);
    return this.findById(id);
  }

  async delete(id) {
    return await this.jobRepository.delete(id);
  }
}

export default new JobService();