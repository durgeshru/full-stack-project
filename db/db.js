const mongoose = require('mongoose');

function connectdb() {
  mongoose.connect(process.env.connect_db)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Error in DB connection:", err);
    });
}

module.exports = connectdb;