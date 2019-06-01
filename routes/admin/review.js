var Review = require("../../modules/review.js");
var User = require("../../modules/user.js");
var Good = require("../../modules/good.js");
var express = require('express')
var router = express.Router()

var _ = require('lodash')


router.get('/', async function(req, res){
    const docs = await Review.findAll({
        order:[
            ['createdAt', 'DESC'],
        ],
        include:[
            User, Good
        ]
    })
    res.render("admin/review/list", {title: '评论', layout: 'admin/layout', list: docs });
});


router.get('/delete', async function(req, res){
    try {
       await Review.destroy({
            where:{
                _id: req.query.id
            }
        })
        res.json({
            code: 200,
            msg: '删除成功'
        })
    } catch (error) {
        console.log(error)
        res.json({
            code: 500,
            msg: error,
        })
    }
});

module.exports = router;