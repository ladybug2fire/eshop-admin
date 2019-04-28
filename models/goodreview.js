/**
 * 评论信息
 */
var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    userid: { type: String }, // 用户 id
    username: {type: String} , // 用户昵称
    avatar: String, // 头像
    star: { type: Number }, //评分
    addTime: {type: String}, // 添加时间
    desc: {type: String},
    goodid: String,  // 商品 id
});

module.exports = mongoose.model('goodreview',ReviewSchema);