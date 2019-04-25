var Good = require("../../models/good.js");
var Food = require("../../models/article.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var multer = require('multer');

router.get('/', function(req, res){
    Food.find().sort({"_id":-1}).exec(function(err, docs){
        res.render("admin/food/list", {title: '菜谱', layout: 'admin/layout', list: docs });
    })
});

router.get('/delete', function(req, res){
    Food.findByIdAndRemove(req.query.id,function(err, result){
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