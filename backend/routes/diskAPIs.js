import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

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
        // create disk entry in DB
        return res.status(200).json({ "status": "OK", "message": "Disk accepted for processing." });
      } catch(err) {
        console.log(err);
        return res.status(504).send({ "status": "FAIL", "message": "Disk upload failed on our side." });
      }

    });
};
