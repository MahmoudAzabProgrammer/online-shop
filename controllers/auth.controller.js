const authModel = require('../models/auth.model')
const validationResult = require('express-validator').validationResult

exports.getSignup = (req, res, next) => {
    res.render('signup', {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: "Signup"
    })  
}

exports.postSignup = (req, res, next) => {
    //return console.log(valildationResult(req).array());
    if(validationResult(req).isEmpty()) {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password)
    .then(() => res.redirect('/login'))
    .catch(err => {
        //console.log(err)
        req.flash("authError", err)
        res.redirect('/signup')})
    } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/signup')
    }
}

exports.getLogin = (req, res, next) => {
    //console.log(req.flash('authError')[0])
    res.render('login', {
        authError: req.flash("authError")[0],
        validationErrors: req.flash('validationErrors'),
        isUser: false,
        isAdmin: false,
        pageTitle: "Login"
    })
}

exports.postLogin = (req, res, next) => {
    //return console.log(valildationResult(req).array())
    if(validationResult(req).isEmpty()) {
        authModel
        .login(req.body.email, req.body.password) 
        .then(result => {
        req.session.userId = result.id,
        req.session.isAdmin = result.isAdmin

        res.redirect("/")
        console.log('Login Done')})
        .catch(err => {
        //console.log(err)
        req.flash('authError', err)
        res.redirect('/login')
        console.log('thetre error')
        })
    } else {
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/login')
    }
    
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect("/")
        console.log('out')
    })
}
