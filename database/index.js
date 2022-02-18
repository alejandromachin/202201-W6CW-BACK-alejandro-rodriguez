const mongoose = require("mongoose");
const debug = require("debug")("thingsIAlreadyKnow:database");

const connectToDatabase = (mongoConnectionString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(mongoConnectionString, (error) => {
      if (error) {
        debug(`couldn't connect to database: ${error.message}`);
        reject();
      }
      debug("Connected to database");
      resolve();
    });
  });

module.exports = connectToDatabase;
