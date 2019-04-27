/**
 * 搜索历史信息
 */
var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var historySchema = new Schema({
    userid: { type: String },
    keys: [String],
});

module.exports = mongoose.model('history',historySchema);