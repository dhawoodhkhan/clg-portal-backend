const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const conn = require('../db');

conn.connectToMongooseDB();

const adminSchema = new Schema({
    username: {
        type: String,
        required: [true, "Name is mandatory"]
    },
    password: {
        type: Number,
        required: [true, "Age is mandatory"]
    },
});



const adminCollection = mongoose.model("admin", adminSchema);


module.exports = adminCollection;