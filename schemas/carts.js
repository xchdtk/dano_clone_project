const mongoose = require("mongoose");

const { Schema } = mongoose;
const usersSchema = new Schema({
    cartId: {
        type: Number,
        require: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    goodsId: {
        type: Number,
        required: true,
    },
    option: {
        type: String,
    },

    quantity: {
        type: Number
    }
});

module.exports = mongoose.model("Carts", usersSchema);