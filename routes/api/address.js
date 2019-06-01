var Address = require("../../modules/address.js");
var OrderItem = require("../../modules/orderitem.js");
var Good = require("../../modules/good.js");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

var express = require('express')
var router = express.Router()
var _ = require('lodash')

// 查询当前用户的地址
router.get('/list', async function(req, res){
    try {
      const result = await Address.findAll({
        order:[
          ['createdAt', 'DESC'],
        ],
        where:{
            userid: req.query.id,
        },
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

// 新增
router.post('/add', async function(req, res) {
    try {
        await Address.create(req.body)
        res.json({
            code: 200,
            msg: "添加成功"
        });
    } catch (error) {
        console.log(error)
        res.json({
            code: 500
        }); 
    }
})

router.get('/del', async function(req, res) {
    try {
        await Address.destroy({
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
    try {
        const result = await Address.findOne({
            where:{
                _id: req.query.id
            }
        })
        res.json({
            code: 200,
            msg: '获取成功',
            data: result
        })
    } catch (error) {
        res.json({
            code: 500,
            msg: err,
        })
    }
})

router.post('/update', async function(req, res) {
    try {
        const result = await Address.update(req.body, {
            where:{
                _id: req.body._id
            },
        })
        res.json({
            code: 200,
            msg: '更新成功',
            data: result
        })
    } catch (error) {
        res.json({
            code: 500,
            msg: err,
        })
    }
})



module.exports = router;