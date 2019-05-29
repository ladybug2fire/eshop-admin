var Good = require("../../modules/good.js");
var User = require("../../modules/user.js");
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
var express = require('express')
var router = express.Router()
var _ = require('lodash')

router.get('/list', async function(req, res){
    try {
      const result = await Good.findAll({
        order:[
          ['createdAt', 'DESC'],
        ]
      })
      res.json({
        code: 200,
        msg: '获取成功',
        data: result,
      })
    } catch (error) {
      res.json({
        code: 500,
        msg: error,
      }) 
    }
})


router.get('/get', async function(req, res){
    try {
      const result = await Good.findOne({
        where:{
          _id: req.query.id
        }
      })
      res.json({
        code: 200,
        msg: '获取成功',
        data: result,
      })
    } catch (error) {
      res.json({
        code: 500,
        msg: error,
      }) 
    }
})

router.get('/myfavor', async function(req, res){
    try {
      const user = await User.findOne({
        where:{
          _id: req.query.id
        },
        include: Good
      })
      res.json({
        code: 200,
        msg: '成功',
        data: user
      })
    } catch (error) {
      console.log(error)
      res.json({
        code: 500,
        msg: error,
      }) 
    }
})
router.get('/favor', async function(req, res){
    try {
      const user = await User.findByPk(req.query.id)
      if(user){
        const good = await Good.findByPk(req.query.goodid);
        if(req.query.like==='true'){
          await user.addGood(good)
        }else{
          await user.removeGood(good)
        }
        res.json({
          code: 200,
          msg: '成功',
        })
      }else{
        res.json({
          code: 300,
          msg: '未登录',
        }) 
      }
    } catch (error) {
      console.log(error)
      res.json({
        code: 500,
        msg: error,
      }) 
    }
})

router.get("/search",async function(req, res) {
    let tag = req.query.tag;
    if(!tag){
      res.json({
        code: 500,
        msg: "条件为空"
      }); 
    }
    try {
      const result = await Good.findAll({
        where:{
          [Op.or]:[
            {
              cat:{
                [Op.like]: `%${tag}%`
              }
            },
            {
              goodname:{
                [Op.like]: `%${tag}%`
              }
            }
          ]
        }
      })
      res.json({
        code: 200,
        data: result
      });
    } catch (error) {
      console.log(error)
      res.json({
        code: 500,
        msg: error
      });
    }
});

module.exports = router;