import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';

export default function(app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(fileUpload({
    "createParentPath": true,
    "limits": { "fileSize": 1 * 1024 * 1024 * 1024 }  // 1MB file upload limit
  }));

  app.route('/api/v1/c64')
    .get((req, res) => {
      return res.json({ "status": "OK", "message": "c64 v1 API is running" });
    })
    .post( async (req, res) => {
      if (!req.files) {  // fix this for something other than sloppy falsy check
        return res.send({ "status": "FAIL", "message": "File not found." });
      }
      let disk = req.files.disk;  // disk is the field name of the file dealie
// disk now has .name  .mimetype  .size  .truncated  .md5 attributes
// disk now has .mv function that takes location argument for target location to mv
// disk now has .data  which is a "buffer representation" of the file
      disk.mv(`/tmp/disk_images/${disk.md5}.d64`);

      // save the file to storage bucket (not fs)
/*
      if (storage.fail) {
        // log message / alert that storage is failing
        return res.send({ "status": "FAIL", "message": "Disk upload failed on our side." });
      }
*/

      // send message to mq about new disk upload
/*
      if (mq.fail) {
        // log message / alert that mq inserts are failing
        return res.send({ "status": "FAIL", "message": "Disk upload failed on our side." });
      }
*/

      return res.send({ "status": "OK", "message": "Disk accepted for processing." });
    });
}
