var Good = require("../../modules/good.js");
var Order = require("../../modules/order.js");
var User = require("../../modules/user.js");
var express = require('express')
var router = express.Router()

router.get('/', async function(req, res){
    const orders = await Order.findAll({
        include:[
            {
                model: Good,
                through:{
                    attributes: ['count'],
                }
            }
            ,User
        ],
        order:[
            ['createdAt', 'DESC'],
        ],
    })
    res.render("admin/order/list", {title: '订单', layout: 'admin/layout', list: orders });
});

router.get('/delete', function(req, res){
    try {
        Order.destroy({
            where:{
                _id: req.query.id,
            }
        })
        res.json({
            code: 200,
            msg: '删除成功'
        })
    } catch (error) {
        res.json({
            code: 500,
            msg: error,
        })
    }
});

router.get('/detail', async function(req, res){
    try {
        const detail = await Order.findOne({
            where:{
                _id: req.query.id,
            },
            include:[
                {
                    model: Good,
                    through:{
                        attributes: ['count'],
                    }
                }
                ,User
            ],
        })
        console.log(detail);
        res.render('admin/order/detail', {title: '订单详情', layout: 'admin/layout', detail: detail }) 
    } catch (error) {
        console.log(error)
        res.render('admin/error', {title: '错误', error: error.msg, layout: false})
    }
});

module.exports = router;