import Cloud from "@google-cloud/storage";
const { Storage } = Cloud;

// TODO: find better way that doesn't have ./config/ prefix
const key = "./config/just-over-five.json";
const storage = new Storage({ "keyFilename": key });
const bucket = storage.bucket("disks-pending-processing");

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
