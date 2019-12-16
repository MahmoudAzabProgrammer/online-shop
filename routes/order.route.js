const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const orderController = require('../controllers/order.controller')
const authGuard = require('./guards/auth.guard')

router.get("/", authGuard.isAuth, orderController.getOrder)

router.post(
    "/",
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check("amount").not().isEmpty().withMessage("amount is required").isInt({min: 1}).withMessage("amount must be grater than 0"),
    orderController.postOrder
)

module.exports = router