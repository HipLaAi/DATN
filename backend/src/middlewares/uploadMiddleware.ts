import { injectable } from 'tsyringe';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { config } from '../config/config';
import sharp from 'sharp';

cloudinary.config({
  cloud_name: config.cloud.name,
  api_key: config.cloud.key,
  api_secret: config.cloud.secret,
});

@injectable()
export class UploadMiddleware {
  private upload = multer({
    storage: multer.memoryStorage(),
  }).array('files');

  get Upload() {
    return this.upload;
  }

  async uploadToCloudinary(fileBuffer: Buffer, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads', public_id: fileName },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || '');
        }
      );

      Readable.from(fileBuffer).pipe(uploadStream);
    });
  }

  async UploadFiles(req: any): Promise<string[]> {
    const uploadPromises = req.files.map(async (file: any) => {
      let fileBuffer = file.buffer;
      const fileName = file.originalname.split('.')[0] + '-' + Math.round(Math.random() * 1e9);

      // Kiểm tra nếu file là ảnh, sẽ nén và resize ảnh
      if (file.mimetype.startsWith('image/')) {
        fileBuffer = await sharp(file.buffer)
          .resize(2048) // Resize ảnh
          .jpeg({ quality: 80 }) // Giảm chất lượng
          .toBuffer();
      }

      // Upload lên Cloudinary
      return this.uploadToCloudinary(fileBuffer, fileName);
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  }

  extractPublicId(url: string) {
    if (typeof url !== "string") {
      throw new Error("URL must be a string");
    }
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.\w+)?$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
  
  
  async Remove(url: string) {
    return new Promise((resolve, reject) => {
      const publicId = this.extractPublicId(url);
      if (!publicId) {
        return reject(new Error("Invalid URL or unable to extract publicId"));
      }
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
  
}

