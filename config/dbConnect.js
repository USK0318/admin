const mongoose = require("mongoose");
const dotenv = require("dotenv").config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(( req, res ) => { console.log("Database connected") })
        .catch(( req, res ) => { console.log("database is NOT connected") });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;