const mongoose = require("mongoose");

const { Schema } = mongoose;
const goodsSchema = new Schema({
  goodsId: {
    type: Number,
    required: true,
    unique: true
  },
  thumbnail : {
      type : String
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String
  },
  price: {
    type: String
  },
  discount_rate : {
    type: String
  },
  option: {
    type: [String]
  },
  goods_info: {
    type: Schema.Types.Mixed
  },
  delevery_status: {
    type: Boolean
  },
  delevery_price : {
    type : String
  },
  delevery_info : {
    type : String
  },
  detail_image: {
    type : [String]
  }
});

module.exports = mongoose.model("Goods", goodsSchema);