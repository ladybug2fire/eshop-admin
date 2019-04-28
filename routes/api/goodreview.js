var Good = require("../../models/good.js");
var GoodReview = require("../../models/goodreview.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var fs = require('fs');
var multer = require('multer');
var _ = require('lodash')

var upload = multer({ dest: 'uploads/img/'});

router.post('/add', async function(req, res){
    const reviews = _.get(req.body, 'reviews');
    const order = await Order.findById(req.body.id)
    if(order.isReview){
        res.json({
            code: 500,
            msg: '已经评论过'
        }) 
    }
    let goodReviews = [];
    _.each(reviews, e=>{
        delete e._id
        goodReviews.push(new GoodReview({
            ...e,
            username: req.body.username,
            userid: req.body.userid,
            avatar: req.body.avatar,
            addTime:new Date().toLocaleString(), 
        }))
    })
    Promise.all([
        Order.findByIdAndUpdate(req.body.id, {isReview: true}),
        GoodReview.insertMany(goodReviews)
    ]).then(result=>{
        res.json({
            code: 200,
            msg: '发表成功'
        })
    }).catch(err=>{
        console.log(err);
        res.json({
            code: 500,
            msg: '发布失败'
        })
    })
})

router.get('/list', function(req, res){
    GoodReview.find({goodid: req.query.id}).sort({"_id":-1}).exec(function(err, result){
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
    GoodReview.findByIdAndRemove(req.query.id, function(err, result){
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