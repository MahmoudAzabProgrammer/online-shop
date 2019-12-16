const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/online-shop'
const cartModel = require('../models/cart.model')
const orderSchema = mongoose.Schema({
    name : String,
    price: Number,
    amount: Number,
    total: Number,
    address: String,
    status: {
        type: String,
        default : "pending"
    },
    userId: String,
    productId: String,
    timeOrder: Number
})
const OrderItem = mongoose.model('order', orderSchema)

exports.addNewOrder = data => {
    return new Promise ((resolve,reject) => {

        cartModel
        .deleteItem(data.cartId)
        .then(() => mongoose.connect(DB_URL))
        .then(() => {
            data.timeOrder = Date.now()
            let order = new OrderItem(data)
            return order.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.getOrdersByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => OrderItem.find({userId: userId}, {}, {sort: {timeOrder: 1}})
        ).then(orders => {
            mongoose.disconnect()
            resolve(orders)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.editOrder = (id, newStatus) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => OrderItem.updateOne({_id: id}, {status: newStatus}))
        .then(orders => {
            mongoose.disconnect()
            resolve(orders)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}