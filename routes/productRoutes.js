const express = require('express')
const {addCategory,getCategories,addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct} = require('../controllers/product')
const {addToWishlist,getWishlist} = require('../controllers/wishlist')

const router = express.Router()

//product
router.post("/product/add", addProduct)
router.get("/products",getAllProducts)
router.route("/product/:id").get(getAProduct).put(updateProduct).delete(deleteProduct)

// category
router.post("/category/add",addCategory)
router.get("/category",getCategories)

//wishlist
router.post("/wishlist/add",addToWishlist)
router.get("/wishlist/:id",getWishlist)

module.exports = router