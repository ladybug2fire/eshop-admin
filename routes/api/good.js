var Good = require("../../models/good.js");
var Review = require("../../models/review.js");
var Order = require("../../models/order.js");
var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()
var _ = require('lodash')

router.get('/list', function(req, res){
    Good.find().sort({"_id":-1}).exec(function(err, result){
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

router.get("/search", function(req, res) {
    let tag = req.query.tag;
    if(!tag){
      res.json({
        code: 500,
        msg: "条件为空"
      }); 
    }
    Good.find().or([{cat: {$regex:tag, $options: 'i'}},{goodname: {$regex: tag, $options:'i'}}]).exec(function(err, result) {
        console.log(req.query.id)
      if (err) {
          res.json({
            code: 500,
            msg: "异常"
          });
        } else {
          res.json({
            code: 200,
            data: result
          });
        }
    });
  });

module.exports = router;