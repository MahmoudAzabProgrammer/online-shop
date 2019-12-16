const router = require('express').Router()
const check = require('express-validator').check
const multer = require('multer')
const adminController = require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')

router.get("/add", adminGuard, adminController.getAdd)
router.post(
    '/add',
    adminGuard,
    multer({
        storage: multer.diskStorage({
            destination: (req, res, cb) => {
                cb(null, 'images')
            },
            filename: (req,file,cb) => {
                cb(null, Date.now() + "-" + file.originalname)
            }
        })
    }).single('image'),
    check('image').custom((value, {req}) => {
        if(req.file) return true
        else throw "image is require"
    }),
    adminController.postAdd
)
module.exports = router
