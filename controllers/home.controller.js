const productModel = require('../models/products.model')

exports.getHome = (req,res,next) => {

    //get products
    //render index.ejs
    // get gategory
    //if category && category != all 
    //filter
    //else 
    // render all
    console.log(req.session.userId)
    let category = req.query.category
    let validCategories = ['clothes', 'phones', 'computers', 'electonics','bags']
    let productsPromise

    if(category && validCategories.includes(category))
        productsPromise = productModel.getProductsByCategory(category)
    else  productsPromise  = productModel.getAllProducts()
    productsPromise.then(products => {
        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationError: req.flash("validationErrors")[0],
            pageTitle: "Home"
        })
    })
}