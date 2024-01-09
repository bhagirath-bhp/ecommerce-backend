const express = require('express')
const {addCategory,getCategories,addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct,addCollection,getCollection,getProdutsByCategory, getProductsByCollection} = require('../controllers/product')
const {addToWishlist,getWishlist} = require('../controllers/wishlist')
const {isLoggedIn} = require('../middleware/auth')
const {addToCart,getCart,reduceQuantity,removeFromCart} = require('../controllers/cart')

const router = express.Router()

//product
router.post("/product/add", isLoggedIn,addProduct)
router.get("/products",getAllProducts)
router.route("/product/:id").get(getAProduct).put(isLoggedIn,updateProduct).delete(isLoggedIn,deleteProduct)

// category
router.post("/category/add",isLoggedIn,addCategory)
router.get("/category",isLoggedIn,getCategories)
router.get("/category/:id",isLoggedIn,getProdutsByCategory)

//collection
router.post("/collection/add",isLoggedIn,addCollection)
router.get("/collection",getCollection)
router.get("/collection/:id",getProductsByCollection)

//wishlist
router.post("/wishlist/add",isLoggedIn,addToWishlist)
router.get("/wishlist/:id",isLoggedIn,getWishlist)

//cart
router.delete("/cart/remove",isLoggedIn,removeFromCart)
router.post("/cart/reduce",isLoggedIn,reduceQuantity)
router.post("/cart",isLoggedIn,addToCart)
router.get("/cart/:id",isLoggedIn,getCart)

module.exports = router