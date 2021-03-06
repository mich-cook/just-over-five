import dotenv from 'dotenv';
dotenv.config();    // get the mongo config

import _mongo from 'mongodb';
const { MongoClient } = _mongo;

const database = process.env.MONGO_DATABASE;
const diskCollection = process.env.MONGO_DISK_COLLECTION;
const userCollection = process.env.MONGO_USER_COLLECTION;

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
};

const isDuplicate = async id => {
  const query = { "_id": id };

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, { "useNewUrlParser": true, "useUnifiedTopology": true });
    const result = await client.db(database).collection(diskCollection).findOne(query);
    client.close();
    return new Promise((resolve, reject) => resolve(result));   // result of successful query
  } catch(err) {
    console.log(`error from mongo client: ${err}`);
    return new Promise((resolve, reject) => reject(`Trouble trying to find ${id}.d64 in mongo`));   // problem with query
  }
};

const getDiskContents = async id => {
  const query = { "_id": id };

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, { "useNewUrlParser": true, "useUnifiedTopology": true });
    const result = await client.db(database).collection(diskCollection).findOne(query);
    client.close();
    return new Promise((resolve, reject) => resolve(result));   // result of successful query
  } catch(err) {
    console.log(`error from mongo client: ${err}`);
    return new Promise((resolve, reject) => reject(`Trouble trying to find ${id}.d64 in mongo`));   // problem with query
  }
};

const getUserDisks = async id => {
  const pipeline = [
    { "$match": { "_id": id }},
    { "$lookup": { "from": "disks", "localField": "disks", "foreignField": "_id", "as": "disks" }},
    { "$match": { "disks.validated": true }},
    { "$project": { "disks.files": 0, "disks.validated": 0, "_id": 0 }}
  ];

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, { "useNewUrlParser": true, "useUnifiedTopology": true });
    const user = await client.db(database).collection(userCollection).aggregate(pipeline).toArray();
    client.close();
    const response = user[0] || null;
    return new Promise((resolve, reject) => resolve(response));   // result of successful query
  } catch(err) {
    console.log(`error from mongo client: ${err}`);
    return new Promise((resolve, reject) => reject(`Trouble getting disks for user: ${id}`));
  }

};

// export default createDisk;
export { createDisk, isDuplicate, getUserDisks, getDiskContents };
