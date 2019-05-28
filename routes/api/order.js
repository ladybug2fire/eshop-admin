var Order = require("../../modules/order.js");
var OrderItem = require("../../modules/orderitem.js");
var Good = require("../../modules/good.js");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

var express = require('express')
var router = express.Router()
var _ = require('lodash')

// 查询当前用户的订单
router.get('/list', async function(req, res){
    try {
      const result = await Order.findAll({
        order:[
          ['createdAt', 'DESC'],
        ],
        include: Good
      })
      res.json({
        code: 200,
        msg: '获取成功',
        data: result,
      })
    } catch (error) {
        console.log(error)
      res.json({
        code: 500,
        msg: error,
      }) 
    }
})

// 下单
router.post('/buy', async function(req, res) {
    try {
        // sequenlize 的关联规则特别复杂，这里比较难懂 可以参考下面的文档 
        // https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/associations.md
        // https://segmentfault.com/a/1190000003987871#articleHeader25
        const order = await Order.create(_.pick(req.body, ['userid', 'addTime', 'price', 'goods']));
        await Promise.all(_.map(req.body.goods,async e=>{
            const good = await Good.findByPk(e._id)
            return order.addGood(good,{through:{count: e.count}})
        }))
        if(order){
            res.json({
                code: 200,
                msg: "下单成功"
            });
        }
    } catch (error) {
        console.log(error)
        res.json({
            code: 500
        }); 
    }
})

router.get('/del', async function(req, res) {
    try {
        const order = await Order.findByPk(req.query.id)
        await order.setGoods([]);
        await Order.destroy({
            where:{
                _id: req.query.id
            }
        });
        res.json({
            code: 200,
            msg: '删除成功'
        })
    } catch (error) {
        console.log(error);
        res.json({
            code: 500,
            msg: error,
        })
    }
})

router.get('/get', async function(req, res) {
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