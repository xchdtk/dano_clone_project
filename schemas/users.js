const mongoose = require("mongoose");

const { Schema } = mongoose;
const usersSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    nickname: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

module.exports = mongoose.model("Users", usersSchema);