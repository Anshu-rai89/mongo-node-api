const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const mongo = new MongoMemoryServer();

beforeAll(async () => {
  // setup our test mongodb;

  const mongoUri = mongo.start();

  await mongoose.connect();
  console.log("connedted");
});

beforeEach(async () => {
  // we will clean all collection after each test

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
