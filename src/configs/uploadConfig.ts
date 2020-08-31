import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default {
  directory: resolve(__dirname, '..', '..', 'tmp'),
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename(req, file, cb) {
      const hashFile = crypto.randomBytes(10).toString('hex');

      const filenameHash = `${hashFile}-${file.originalname}`;

      cb(null, filenameHash);
    },
  }),
};
