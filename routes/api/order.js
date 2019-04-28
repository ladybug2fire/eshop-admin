var Good = require("../../models/good.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var _ = require('lodash')

// 查询当前用户的订单
router.get('/list', function(req, res){
    Order.find({
        userid: req.query.userid
    }).sort({"_id":-1}).exec(function(err, result){
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

// 下单
router.post('/buy', function(req, res) {
    let order = new Order(req.body);
    order.save(function(err, result2) {
        if (err) {
            res.json({
            code: 500
            });
        } else {
            res.json({
            code: 200,
            msg: "下单成功"
            });
        }
    });
})

router.get('/del', function(req, res) {
    Order.findByIdAndRemove(req.query.id,function(err, result){
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
})

router.get('/get', function(req, res) {
    Order.findById(req.query.id,function(err, result){
        if(err){
            res.json({
                code: 500,
                msg: err,
            })
        }else{
            res.json({
                code: 200,
                msg: '获取成功',
                data: result
            })
        }
    })
})



module.exports = router;