var Movie = require("../models/movie.js");

exports.index = function (req, res) {
    Movie.find().sort({'_id': -1}).exec(function(err, docs){
        if(err)res.send("出错了");
        res.render("index", { title: '首页' , list: docs});
    })
}

exports.signup = function(req, res){
    res.render("signup", {title: '注册', layout: 'base' });
}

exports.login = function(req, res){
    res.render("login", {title: '登入' });
}

exports.order = function(req, res){
    res.render("order", {title: '选座' });
}