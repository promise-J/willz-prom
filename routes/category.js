const CategoryController = require('../controllers/category.controller')
const { ROUTE_CATEGORY } = require('../util/page-route')

const router = require('express').Router()

router.post(ROUTE_CATEGORY, (req, res)=>{
    const categoryController = new CategoryController()
    return categoryController.createCategory(req, res)
})
router.put(ROUTE_CATEGORY+"/:id", (req, res)=>{
    const categoryController = new CategoryController()
    return categoryController.editCategory(req, res)
})
router.delete(ROUTE_CATEGORY+"/:id", (req, res)=>{
    const categoryController = new CategoryController()
    return categoryController.deleteCategory(req, res)
})
router.get(ROUTE_CATEGORY, (req, res)=>{
    const categoryController = new CategoryController()
    return categoryController.getAllCategory(req, res)
})

module.exports = router