var User = require("../../modules/user.js");
var express = require('express')
var router = express.Router()
var _ = require("lodash");
var multer = require("multer");

var upload = multer({ dest: "uploads/img/" });

router.post("/upload", upload.single("file"), function(req, res, next) {
    let obj = req.file;
    res.json({
      code: 200,
      msg: "success",
      data: "/img/" + obj.filename
    });
  });

router.post('/register', async function(req, res){
    const existUser = await User.findOne({
        where:{
            username: req.body.username
        }
    });
    if(existUser){
        res.json({
            code: 500,
            msg: '用户名已经被占用'
        })
    }else{
        console.log(req.body)
        try {
            var user = await User.create({
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

router.post('/login', async function(req, res){
    try {
        const user = await User.findOne({
            where:{
                username: req.body.username
            }
        });
        if(user && user.password === req.body.password){
            res.json({
                code: 200,
                msg: '登入成功',
                data: user
            }) 
        }else{
            res.json({
                code: 500,
                msg: '密码错误'
            }) 
        }
    } catch (error) {
        console.log(error)
        res.json({
            code: 500,
            msg: '出错了'
        }) 
    }
})

// 编辑要修改下
router.post('/updateUser', function(req, res){
    try {
        const result = User.update(req.body, {
            where:{
                _id: req.body._id
            }
        })
        if(result){
            res.json({
                code: 200,
                msg: '更新成功',
            }) 
        }else{
            res.json({
                code: 300,
                msg: '更新失败',
            })   
        }
    } catch (error) {
        res.json({
            code: 500,
            msg: error,
        })
    }
})

router.get('/delete',async function(req, res){
    try {
        const result = User.destroy({
            where:{
                _id: req.query.id
            }
        })
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