var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    sex: { type: String },
    birthday: { type: String },
    phone: String,
    avatar: String,
    address: { type: String },
    desc: { type: String },
});

module.exports = mongoose.model('User',UserSchema);