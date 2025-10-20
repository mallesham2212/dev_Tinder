const mongoose= require("mongoose");

const connectDb = async () => {
    await mongoose.connect(
      "mongodb+srv://<mogodb_name>:<password>@namstenodetest.qabzq.mongodb.net/devTinder");
};

module.exports = connectDb;




