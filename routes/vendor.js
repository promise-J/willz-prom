const VendorCategory = require('../controllers/category.controller')
const { ROUTE_CATEGORY, ROUTE_VENDOR_UPDATE } = require('../util/page-route')

const router = require('express').Router()

router.post(ROUTE_VENDOR_UPDATE, (req, res)=>{
    const vendorCategory = new VendorCategory()
    return vendorCategory.createCategory(req, res)
})
router.put(ROUTE_CATEGORY+"/:id", (req, res)=>{
    const vendorCategory = new VendorCategory()
    return vendorCategory.editCategory(req, res)
})



module.exports = router