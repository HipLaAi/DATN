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
  // private upload = multer({
  //   storage: multer.memoryStorage(),
  //   limits: {
  //     fileSize: typeof config.limit_size === 'number' ? config.limit_size : parseInt(config.limit_size as string, 10) || 3145728,
  //   },
  // }).array('files');

  // get Upload() {
  //   return this.upload;
  // }

  // async uploadToCloudinary(fileBuffer: Buffer, fileName: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     const uploadStream = cloudinary.uploader.upload_stream(
  //       { folder: 'uploads', public_id: fileName },
  //       (error, result) => {
  //         if (error) return reject(error);
  //         resolve(result?.secure_url || '');
  //       }
  //     );

  //     Readable.from(fileBuffer).pipe(uploadStream);
  //   });
  // }

  // async UploadFiles(req: any): Promise<string[]> {
  //   const uploadPromises = req.files.map(async (file: any) => {
  //     let fileBuffer = file.buffer;
  //     const fileName = file.originalname.split('.')[0] + '-' + Math.round(Math.random() * 1e9);

  //     // Kiểm tra nếu file là ảnh, sẽ nén và resize ảnh
  //     if (file.mimetype.startsWith('image/')) {
  //       fileBuffer = await sharp(file.buffer)
  //         .resize(2048) // Resize ảnh
  //         .jpeg({ quality: 80 }) // Giảm chất lượng
  //         .toBuffer();
  //     }

  //     // Upload lên Cloudinary
  //     return this.uploadToCloudinary(fileBuffer, fileName);
  //   });

  //   const urls = await Promise.all(uploadPromises);
  //   return urls;
  // }

  // extractPublicId(url: string) {
  //   if (typeof url !== "string") {
  //     throw new Error("URL must be a string");
  //   }
  //   const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.\w+)?$/;
  //   const match = url.match(regex);
  //   return match ? match[1] : null;
  // }


  // async Remove(url: string) {
  //   return new Promise((resolve, reject) => {
  //     const publicId = this.extractPublicId(url);
  //     if (!publicId) {
  //       return reject(new Error("Invalid URL or unable to extract publicId"));
  //     }
  //     cloudinary.uploader.destroy(publicId, (error, result) => {
  //       if (error) return reject(error);
  //       resolve(result);
  //     });
  //   });
  // }

  //Khá ổn
  private upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: typeof config.limit_size === 'number' ? config.limit_size : parseInt(config.limit_size as string, 10) || 10485760,
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/zip') {
        cb(new Error('ZIP files are not supported'));
      } else {
        cb(null, true);
      }
    },
  }).array('files');

  get Upload() {
    return this.upload;
  }

  async uploadToCloudinary(fileBuffer: Buffer, fileName: string, mimetype: string, originalExtension: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let resourceType: 'image' | 'raw' | 'auto';
      if (mimetype.startsWith('image/')) {
        resourceType = 'image';
      } else if ([
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ].includes(mimetype)) {
        resourceType = 'raw';
      } else {
        return reject(new Error(`Unsupported file type: ${mimetype}`));
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'uploads',
          public_id: `${fileName}.${originalExtension}`, // Giữ đuôi file gốc
          resource_type: resourceType,
          access_mode: 'public',
          use_filename: true, // Sử dụng tên file gốc
          unique_filename: false, // Không thêm chuỗi ngẫu nhiên vào tên file
        },
        (error, result) => {
          if (error) {
            return reject(new Error(`Upload failed: ${error.message}`));
          }
          if (!result?.secure_url) {
            return reject(new Error('No secure URL returned from Cloudinary'));
          }
          resolve(result.secure_url);
        }
      );

      Readable.from(fileBuffer).pipe(uploadStream).on('error', (error) => {
        reject(new Error(`Stream error: ${error.message}`));
      });
    });
  }

  async UploadFiles(req: any): Promise<string[]> {
    if (!req.files || !Array.isArray(req.files)) {
      throw new Error('No files provided or invalid files format');
    }

    const uploadPromises = req.files.map(async (file: any) => {
      let fileBuffer = file.buffer;
      const fileExtension = file.originalname.split('.').pop()?.toLowerCase() || '';
      const fileName = file.originalname.split('.')[0] + '-' + Math.round(Math.random() * 1e9);

      if (file.mimetype.startsWith('image/')) {
        fileBuffer = await sharp(file.buffer)
          .resize(2048)
          .jpeg({ quality: 80 })
          .toBuffer();
      }

      return this.uploadToCloudinary(fileBuffer, fileName, file.mimetype, fileExtension);
    });

    try {
      const urls = await Promise.all(uploadPromises);
      return urls.filter(url => url);
    } catch (error) {
      console.error(`Upload batch failed: ${(error as Error).message}`);
      throw new Error(`Upload failed: ${(error as Error).message}`);
    }
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

      const resourceType = url.includes('.pdf') || url.includes('.doc') || url.includes('.docx') || url.includes('.xls') || url.includes('.xlsx') ? 'raw' : 'image';

      cloudinary.uploader.destroy(
        publicId,
        { resource_type: resourceType },
        (error, result) => {
          if (error) {
            console.error(`Delete error for ${publicId}: ${error.message}`);
            return reject(new Error(`Delete failed: ${error.message}`));
          }
          resolve(result);
        }
      );
    });
  }
  ///
}

