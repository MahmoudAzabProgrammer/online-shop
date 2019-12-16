const router = require('express').Router()
const bodyParser = require('body-parser')
const check = require('express-validator').check

const productController = require('../controllers/product.controller')
const adminGuard = require('./guards/admin.guard')

router.get('/', productController.getProduct)
router.get('/:id', productController.getProductById)


module.exports = router