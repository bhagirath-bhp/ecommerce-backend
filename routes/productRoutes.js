const express = require('express')
const {addProduct,getAllProducts,getAProduct,updateProduct,deleteProduct,addCollection,getCollection,getProdutsByCategory, getProductsByCollection, getFiveRandomProducts,search} = require('../controllers/product')
const {addToWishlist,getWishlist, removeFromWishlist} = require('../controllers/wishlist')
const {isLoggedIn,checkRole} = require('../middleware/auth')
const {addToCart,getCart,reduceQuantity,removeFromCart} = require('../controllers/cart')

const router = express.Router()

//product
router.post("/product/add", isLoggedIn,checkRole('admin'),addProduct)
router.get("/products",getAllProducts)
router.get("/products/random",getFiveRandomProducts)
router.route("/product/:id").get(getAProduct).put(isLoggedIn,checkRole('admin'),updateProduct).delete(isLoggedIn,checkRole('admin'),deleteProduct)

//collection
router.post("/collection/add",isLoggedIn,addCollection)
router.get("/collection",getCollection)
router.get("/collection/:id",getProductsByCollection)

//wishlist
router.post("/wishlist/add",isLoggedIn,addToWishlist)
router.get("/wishlist/:id",isLoggedIn,getWishlist)
router.delete('/wishlist/remove',isLoggedIn,removeFromWishlist)

//cart
router.delete("/cart/remove",isLoggedIn,removeFromCart)
router.post("/cart/reduce",isLoggedIn,reduceQuantity)
router.post("/cart",isLoggedIn,addToCart)
router.get("/cart/:id",isLoggedIn,getCart)

router.get("/products/search",search)

module.exports = router