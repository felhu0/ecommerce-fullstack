const router = require('express').Router()
const { getAllProducts, createProducts, getproductById, deleteProductById, updateProductById } = require('../models/productModel')

router.post('/', createProducts)
router.get('/', getAllProducts)
router.get('/:id', getproductById)
router.delete('/:id', deleteProductById)
router.put('/:id', updateProductById)




module.exports = router;