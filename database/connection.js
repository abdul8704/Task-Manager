const mongoose = require("mongoose");

function connectDB(url){
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
}

module.exports = connectDB;
