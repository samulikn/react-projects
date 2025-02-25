const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, { dbName: "BreadShop" });
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;