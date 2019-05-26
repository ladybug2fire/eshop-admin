var User = require("../../modules/user.js");
var express = require('express')
var router = express.Router()

router.get('/', async function(req, res){
    const docs = await User.getAll();
    res.render("admin/user/list", {title: '用户管理', layout: 'admin/layout', list: docs });
});

router.get('/getuser', function(req, res){
    User.find(function(err, docs){
        if(err){
            res.json({
                code: 500,
                msg: '错误'
            })
        }else{
            res.json({
                code: 200,
                data: docs,
            })
        }
    })
});

router.post('/new', async function(req, res){
    const existUser = await User.getUser(req.body.username);
    if(existUser){
        res.send('用户名已经被占用')
    }else{
        console.log(req.body)
        try {
            var user = await User.createUser({
                username : req.body.username,
                password: req.body.password,
                phone: req.body.phone,
            });
            if(user){
                res.json({
                    code: 200,
                    msg: '创建账号成功'
                })  
            }
        } catch (error) {
            res.json({
                code: 500,
                msg: error,
            }) 
        }
    }
})

router.get('/new', function(req, res){
    res.render("admin/user/new", {title: '创建用户', layout: 'admin/layout'})
})

router.get('/delete',async function(req, res){
    try {
        const result = User.del(req.query.id)
        if(result){
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }else{
            res.json({
                code: 300,
                msg: '删除失败'
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            code: 500,
            msg: '异常'
        })
    }
});

module.exports = router;