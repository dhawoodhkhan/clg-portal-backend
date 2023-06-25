const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const conn = require('../db');

conn.connectToMongooseDB();

const staffSchema = new Schema({
    // _id: {
    //     type: 'string',
    //     required: [true, "id is mandatory"]
    // },
    name: {
        type: 'string',
        required : [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is mandatory"]
    },
    password: {
        type: Number,
        required: [true, "password is mandatory"]
    },
    branch: {
        type: String,
        required: [true, "branch is mandatory"]
    },
    email: {
        type: String,
        required: [true, "email is mandatory"]
    },
    phone: {
        type: Number,
        required: [true, "Phone number is mandatory"]
    },
});



const staffCollection = mongoose.model("staff", staffSchema);


module.exports = staffCollection;