var Good = require("../../modules/good.js");
var Review = require("../../modules/review.js");
var Order = require("../../models/order.js");
var User = require("../../modules/user.js");
var express = require('express')
var router = express.Router()
var _ = require('lodash')

router.post('/add', async function(req, res){
    const reviews = _.get(req.body, 'reviews');
    const {userid} = _.pick(req.body, ['userid', 'addTime'])
    const user = await User.findByPk(req.body.userid)
    if(user){
        // const goodReviews = await Review.bulkCreate(_.map(reviews, e =>_.assign(_.pick(e, ['star', 'review']), {
        //     userid,
        //     goodid: e._id,
        //     addTime:new Date().toLocaleString(), 
        // })))
        await Promise.all(_.map(reviews, async e=>{
            const review = await Review.create(_.assign(_.pick(e, ['star', 'review']), {
                userid,
                goodid: e._id,
                addTime:new Date().toLocaleString(), 
            }))
            const good =  await Good.findByPk(e._id);
            await review.setGood(good);
            
            await user.addReview(review)
        }))
        // await user.addReviews(goodReviews)
        // console.log(goodReviews);
        res.json({
            code: 200,
            msg: '评论过了'
        })
    }else{
        res.json({
            code: 400,
            msg: '还没登录'
        })
    }
    // const order = await Order.findById(req.body.id)
    // if(order.isReview){
    //     res.json({
    //         code: 500,
    //         msg: '已经评论过'
    //     }) 
    // }
    // let goodReviews = [];
    // _.each(reviews, e=>{
    //     delete e._id
    //     goodReviews.push(new GoodReview({
    //         ...e,
    //         username: req.body.username,
    //         userid: req.body.userid,
    //         avatar: req.body.avatar,
    //         addTime:new Date().toLocaleString(), 
    //     }))
    // })
    // Promise.all([
    //     Order.findByIdAndUpdate(req.body.id, {isReview: true}),
    //     GoodReview.insertMany(goodReviews)
    // ]).then(result=>{
    //     res.json({
    //         code: 200,
    //         msg: '发表成功'
    //     })
    // }).catch(err=>{
    //     console.log(err);
    //     res.json({
    //         code: 500,
    //         msg: '发布失败'
    //     })
    // })
})

router.get('/list', async function(req, res){
    const reviews = await Review.findAll({
        where: {
            goodid: req.query.id
        },
        include: [{
            model: User,
        },{
            model: Good,
        }]
    })
    // const reviews = await User.findAll({
    //     include: [{
    //         model: Review,
    //         where: {
    //             goodid: req.query.id
    //         }
    //     }]
    // })
    res.json({
        code: 200,
        data: reviews,
    })
})

router.get('/del', async function(req, res){
    try {
        await Review.destroy({
            where: {
                _id: req.query.id
            }
        })
        res.json({
            code: 200,
            msg: '删除成功',
        })
    } catch (error) {
        res.json({
            code: 500,
            msg: error,
        })
    }
})

module.exports = router;