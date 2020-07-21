import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import uploadDiskImage from '../helpers/gcpUpload.js';
import mongoCreateDisk from '../helpers/mongoDisk.js';

export default function(app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(fileUpload({
    "createParentPath": true,
    "limits": { "fileSize": 250 * 1024 }  // 250kB file upload limit (largest disk image is 197376
  }));

  app.route('/api/v1/c64')
    .get((req, res) => {
      return res.json({ "status": "OK", "message": "c64 v1 API is running" });
    })
    .post( async (req, res) => {
      if (!req.files) {  // TODO: fix this for something other than sloppy falsy check
        return res.status(404).send({ "status": "FAIL", "message": "File not found." });
      }

      try {
        const disk = req.files.disk;  // disk is the field name of the file dealie
        // upload file
        const imageUrl = await uploadDiskImage({ "originalname": `to-process/${disk.md5}.d64`, "buffer": disk.data });

        // create disk entry in DB
        const dbStoreResult = await mongoCreateDisk(disk.md5);

        return res.status(200).json({ "status": "OK", "message": "Disk accepted for processing." });
      } catch(err) {
        console.log(`Problem storing the disk and/or its metadata: ${err}`);
        return res.status(504).send({ "status": "FAIL", "message": "Disk upload failed on our side." });
      }

    });
};
