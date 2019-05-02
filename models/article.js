/**
 * 菜谱
 */
var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: { type: String },
    picUrl: { type: String },
    username: String,
    userid: String,
    avatar: String,
    detail: String,
    addTime: String,
    views: Number,
});

module.exports = mongoose.model('article',ArticleSchema);