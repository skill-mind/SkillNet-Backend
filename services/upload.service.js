import cloudinary from 'cloudinary';
import { createWriteStream, unlink } from 'fs';
import { promisify } from 'util';

const unlinkAsync = promisify(unlink);

class UploadService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }

  async uploadFile(file, folder = 'job-banners') {
    try {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: folder,
        resource_type: 'auto'
      });

      // Clean up temporary file
      await unlinkAsync(file.path);

      return {
        url: result.secure_url,
        publicId: result.public_id
      };
    } catch (error) {
      // Clean up temporary file in case of error
      await unlinkAsync(file.path);
      throw error;
    }
  }

  async deleteFile(publicId) {
    if (!publicId) return;
    
    try {
      await cloudinary.v2.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }
}

export default new UploadService();