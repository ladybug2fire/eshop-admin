var Good = require("../../models/good.js");
var Article = require("../../models/article.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var multer = require('multer');

router.get('/', function(req, res){
    Article.find().sort({"_id":-1}).exec(function(err, docs){
        res.render("admin/article/list", {title: '文章', layout: 'admin/layout', list: docs });
    })
});

router.get('/detail', function(req, res){
    console.log('detail')
    Article.findById(req.query.id,function(err, item){
        res.render("admin/article/detail", {title: '详情', layout: 'admin/layout', item });
    })
});

router.get('/delete', function(req, res){
    Article.findByIdAndRemove(req.query.id,function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
});

module.exports = router;