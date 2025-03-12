const CatalogController = require('../controllers/catalog.controller')
const { ROUTE_CATALOG } = require('../util/page-route')

const vendorAuth = require('../middlewares/vendorAuth')

const router = require('express').Router()

router.post(ROUTE_CATALOG, [vendorAuth], (req, res)=>{
    const catalogController = new CatalogController()
    return catalogController.createCatalog(req, res)
})
router.put(ROUTE_CATALOG+"/:id", [vendorAuth], (req, res)=>{
    const catalogController = new CatalogController()
    return catalogController.editCatalog(req, res)
})
router.get(ROUTE_CATALOG+"/:id", [vendorAuth], (req, res)=>{
    const catalogController = new CatalogController()
    return catalogController.getCatalog(req, res)
})
router.delete(ROUTE_CATALOG+"/:id", [vendorAuth], (req, res)=>{
    const catalogController = new CatalogController()
    return catalogController.deleteCatalog(req, res)
})
router.get(ROUTE_CATALOG, (req, res)=>{
    const catalogController = new CatalogController()
    return catalogController.getAllCatalogByVendor(req, res)
})

module.exports = router