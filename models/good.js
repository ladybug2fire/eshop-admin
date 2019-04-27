/**
 * 商品信息
 */
var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var GoodSchema = new Schema({
    goodname: { type: String },
    picUrl: { type: String }, // 一个产品就一个图片吧
    price: { type: Number },
    addTime: {type: String}, // 添加时间
    sales: {type: Number},
    desc: {type: String},
    cat: {type: String},
    specify: {type: String},
});

module.exports = mongoose.model('Good',GoodSchema);