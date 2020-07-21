import dotenv from 'dotenv';
dotenv.config();    // get the mongo config

import _mongo from 'mongodb';
const { MongoClient } = _mongo;

const database = "just-over-five";
const diskCollection = "disks";

const createDisk = async id => {
  let payload = { "_id": id, "validated": null };
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, { "useNewUrlParser": true, "useUnifiedTopology": true });
    const result = await client.db(database).collection(diskCollection).insertOne(payload);
    client.close();
    return new Promise((resolve, reject) => resolve(true));   // insert successful
  } catch(err) {
    console.log(`error from mongo client: ${err}`);
    return new Promise((resolve, reject) => reject(`Trouble trying to store data for ${id}.d64 in mongo`));   // problem with insert
  }
}

export default createDisk;
