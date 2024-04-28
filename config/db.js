const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`);
    } catch (error) {
        console.log('MONGO connect error');
    }
}
module.exports = connectDB;
