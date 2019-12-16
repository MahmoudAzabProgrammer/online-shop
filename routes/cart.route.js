const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const cartController = require('../controllers/cart.controller')
const authGuard = require('./guards/auth.guard')

router.get("/", authGuard.isAuth, cartController.getCart)

router.post(
    "/",
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check("amount").not().isEmpty().withMessage("amount is required").isInt({min: 1}).withMessage("amount must be grater than 0"),
    cartController.postCart
)
router.post(
    "/save",
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check("amount").not().isEmpty().withMessage("amount is required").isInt({min: 1}).withMessage("amount must be grater than 0"),
    cartController.postSave
)
router.post(
    "/delete",
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check("amount").not().isEmpty().withMessage("amount is required").isInt({min: 1}).withMessage("amount must be grater than 0"),
    cartController.postDelete
)
router.post(
    "/deleteAll",
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    check("amount").not().isEmpty().withMessage("amount is required").isInt({min: 1}).withMessage("amount must be grater than 0"),
    cartController.postDeleteAll
)

module.exports = router