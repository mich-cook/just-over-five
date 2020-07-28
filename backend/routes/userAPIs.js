import cors from 'cors';

import { getUserDisks } from '../helpers/mongoDisk.js';

export default function(app) {
  app.use(cors());

  app.route('/api/v1/c64/user/:id')
    .get(async (req, res) => {
      try {
        const user = req.params.id;
        const diskList = await getUserDisks(user);
        return res.status(200).json(diskList);
      } catch(err) {
        console.log(`Problem storing the disk and/or its metadata: ${err}`);
        return res.status(404).send({ "status": "FAIL", "message": "Could not fetch user." });
      }
      console.log(`${req.params.id}`);
      return res.json({ "name": "tempName", "disks": [] });
    });
    // create user to be implemented later
    // .post( async (req, res) => {});

  app.route('/api/v1/c64/users')
    .get((req, res) => {
      return res.json({ "status": "OK", "message": "c64 v1 user API is running" });
    });

};
