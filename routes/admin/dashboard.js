var Good = require("../../modules/good.js");
var Order = require("../../modules/order.js");
var User = require("../../modules/user.js");
var express = require('express')
var router = express.Router()
var _ = require('lodash')

router.get('/', async function(req, res){
    console.log('dashboard')
    const order = await Order.count();
    const total = await Order.sum('price')
    const good = await Good.count();
    const user = await User.count();
    res.render("admin/dashboard", {title: 'dashboard', layout: 'admin/layout', info:{
        good,
        user,
        order,
        total,
    }});
})

module.exports = router;