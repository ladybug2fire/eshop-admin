var Good = require("../../modules/good.js");
var express = require('express')
var router = express.Router()
var multer = require('multer');
var _ = require('lodash')

var upload = multer({ dest: 'uploads/img/'});

router.post("/upload", upload.single('file'), async function(req, res, next){
    let obj = req.file;
    console.log(req.body);
    try {
        let good = await Good.create({
            goodname : req.body.goodname,
            addTime: new Date().toLocaleString(),
            picUrl: '/img/' + obj.filename,
            desc: req.body.desc,
            cat: req.body.cat,
            specify: req.body.specify,
            price: req.body.price,
        });
        if(good){
            res.json({
                code: 200,
                msg: '发布成功'
            }) 
        }
    } catch (error) {
        res.json({
            code: 500,
            msg: error,
        })
    }
});

router.post("/edit", upload.single('file'), async function(req, res, next){
    try {
        const result = await Good.update(req.body, {
            where:{
                _id: req.body.id
            }
        })
        res.json({
            code: 200,
            msg: '修改成功'
        }) 
    } catch (error) {
        res.json({
            code: 500,
            msg: error,
        }) 
    }
});

router.get('/', async function(req, res){
    const docs = await Good.findAll({
        order:[
            ['createdAt', 'DESC'],
        ]
    })
    res.render("admin/good/list", {title: '商品', layout: 'admin/layout', list: docs });
});

router.get('/type', async function(req, res){
    res.render("admin/good/types", {title: '商品类别', layout: 'admin/layout'});
});


router.get('/new', async function(req, res){
    if(req.query.id){
        try {
            const good = await Good.findByPk(req.query.id)
            res.render("admin/good/new", {title: '编辑商品', layout: 'admin/layout', item: good , username: req.session.username});
        } catch (error) {
            console.log(error)
            res.json(error);
        }
    }else{
        res.render("admin/good/new", {title: '发布商品', layout: 'admin/layout'})
    }
})

router.get('/delete',async function(req, res){
    try {
        const result = await Good.destroy({
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

router.get('/dashboard', function(req, res){
    res.render("admin/chart", {title: '商品账目表', layout: 'admin/layout'});
})

module.exports = router;