const { Transaction } = require('sequelize')
const sequelize = require('../db/db')
const Order = require('../models/order')
const OrderItem = require('../models/orderItems')
const Product = require('../models/product')
const Cart = require('../models/cart')
const User = require('../models/user')
const CartItems = require('../models/cartItems')

Order.belongsTo(User,{foreignKey: 'userId'})
OrderItem.belongsTo(Order,{foreignKey:'orderId'})
OrderItem.belongsTo(Product,{foreignKey: 'productId'})

exports.addOrder = async(req,res) => {
    const t = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
    })
    try {
        let amount=0;
        const {userId} = req.body
        const cart = await Cart.findOne({
            where: {userId},
            transaction:t
        })
        if(!cart){
            return res.status(404).json("cart not found")
        }
        const cartItems = await CartItems.findAll({
            where:{cartId: cart.cartId},
            include:[
                {
                    model: Product,
                    attributes: ['productId','name','description','quantity','price']
                }
            ],
            transaction:t,
            attributes: ['itemId','cartId','quantity']
        })

        const order = await Order.create({userId}, {transaction:t})

        for(const item of cartItems){
            console.log(item.product.quantity, item.quantity);
            // console.log("hello");
            const product = await Product.findByPk(item.product.productId,{
                lock: t.LOCK.UPDATE
            })

            if(!product || item.product.quantity < item.quantity){
                if(item.product.quantity == null) continue
                return res.status(400).json("insufficient quantity")
            }

            if(!item.quantity.price) continue
            amount += item.quantity * item.quantity.price

            await Product.update(
                {quantity: item.product.quantity - item.quantity},
                {where: {productId: item.product.productId}, transaction:t}
            )

            await OrderItem.create({
                orderId: order.orderId,
                productId: item.product.productId,
                quantity: item.quantity,
                price: item.product.price,
                amount
            }, {transaction: t})
        }

        
        await Cart.destroy({where:{userId}, transaction:t})
        await t.commit()
        
        return res.status(200).json("order placed");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}