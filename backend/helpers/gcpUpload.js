import dotenv from 'dotenv';
dotenv.config();

import Cloud from "@google-cloud/storage";
const { Storage } = Cloud;

const key = process.env.GCP_KEY_LOCATION;
const storage = new Storage({ "keyFilename": key });
const bucket = storage.bucket(process.env.GCP_BUCKET);

const uploadDiskImage = async file => {
  const { originalname, buffer } = file;
  const fileHandle = bucket.file(originalname);
  const [ fileExists ] = await fileHandle.exists();
  if (fileExists === false) {
    return fileHandle.save(buffer);
  }
  return new Promise((resolve, reject) => resolve(originalname));
};

export default uploadDiskImage;
