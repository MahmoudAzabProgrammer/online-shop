const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const authController = require('../controllers/auth.controller')
const authGuard = require('./guards/auth.guard')

router.get("/signup",authGuard.notAuth ,authController.getSignup)

router.post(
    "/signup", authGuard.notAuth,
    bodyParser.urlencoded({extended : true }),
    check('username').not().isEmpty().withMessage('Username is require'),
    check('email').not().isEmpty().withMessage('Email just be require').isEmail().withMessage('invalid format'),
    check('password').not().isEmpty().withMessage('password just be require').isLength({min: 6}).withMessage('Password is not Have 6 charachters'),
    check('confirmPassword').custom((value ,{req})=> {
        if(value === req.body.password) return true
        else throw "Password don't equal"}),
    authController.postSignup
    )

router.get("/login" ,authGuard.notAuth, authController.getLogin)

router.post(
    "/login", authGuard.notAuth,
    bodyParser.urlencoded({extended : true}),
    check('email').not().isEmpty().withMessage('Email just be require').isEmail().withMessage('invalid format'),
    check('password').not().isEmpty().withMessage('password just be require').isLength({min: 6}).withMessage('Password is not Have 6 charachters'),
    authController.postLogin
    )
router.all("/logout",authGuard.isAuth ,authController.logout)


module.exports = router

