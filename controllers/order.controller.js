const orderModel = require('../models/order.model')
const validationResult = require('express-validator').validationResult

exports.getOrder = (req,res,next) => {
    orderModel.getOrdersByUser(req.session.userId)
    .then(orders => {
        res.render("order", {
            orders: orders,
            isUser: true,
            isAdmin: req.session.isAdmin,
            pageTitle: "Order"
        })
    }).catch(err => console.log(err))
}

exports.postOrder = (req,res,next) => {
    if(validationResult(req).isEmpty()) {
        orderModel.addNewOrder({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            total: req.body.total,
            address: req.body.address,
            status: req.body.status,
            productId: req.body.productId,
            userId: req.session.userId,
            timeOrder: Date.now()
        }).then(() => {
            res.redirect('/order')
        }).catch(err => {
            console.log(err)
        })
    } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect(req.body.redirectTo)
    }
}