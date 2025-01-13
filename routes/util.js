const UtilController = require('../controllers/util.controller')
const { image_uploader } = require('../util/imageUpload')
const { ROUTE_IMAGE_UPLOAD_MULTIPLE, ROUTE_IMAGE_UPLOAD_SINGLE } = require('../util/page-route')

const router = require('express').Router()


router.post(ROUTE_IMAGE_UPLOAD_MULTIPLE, image_uploader.array('file'),(req, res)=>{
    const utilController = new UtilController()
    return utilController.uploadMultipleImage(req, res)
})

router.post(ROUTE_IMAGE_UPLOAD_SINGLE, image_uploader.single('file'), (req, res)=>{
    const utilController = new UtilController()
    return utilController.uploadSingleImage(req, res)
})

module.exports = router