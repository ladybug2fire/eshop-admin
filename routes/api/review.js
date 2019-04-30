var Good = require("../../models/good.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
var multer = require('multer');
var _ = require('lodash')

var upload = multer({ dest: 'uploads/img/'});

router.post('/add', function(req, res){
    var review = new Review(_.assign(_.pick(req.body,
        ['userid', 'username', 'articleid', 'desc', 'avatar']
    ), {
        addTime: new Date().toLocaleString(),
    }))
    review.save(function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: '发布失败'
            })
        }else{
            res.json({
                code: 200,
                msg: '发表成功'
            })
        }
    })
})

router.get('/list', function(req, res){
    Review.find({articleid: req.query.id}).sort({"_id":-1}).exec(function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '获取成功',
                data: result,
            })
        }
        
    })
})

router.get('/del', function(req, res){
    Review.findByIdAndRemove(req.query.id, function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '删除成功',
            })
        }
    })
})

module.exports = router;