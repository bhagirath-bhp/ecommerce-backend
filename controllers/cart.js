const Cart = require('../models/cart')
const CartItems = require('../models/cartItems')
const User = require('../models/user')
const Product = require('../models/product')

User.hasOne(Cart,{
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
})

Cart.belongsTo(User,{
    foreignKey: 'userId'
})

CartItems.belongsTo(Product,{foreignKey: 'productId'})


Cart.hasMany(CartItems,{
    foreignKey: 'cartId'
})

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({
            where: {
                userId
            }
        });

        if (!cart) {
            const newCart = await Cart.create({
                userId
            });

            const [cartItem] = await CartItems.findOrCreate({
                where: {
                    cartId: newCart.cartId,
                    productId
                },
                defaults: {
                    quantity: quantity > 1 ? quantity : 1
                }
            });

            if (!cartItem) {
                return res.status(500).json("Internal Server Error");
            }

            return res.status(200).json("Added to cart");
        }

        const [cartItem] = await CartItems.findOrCreate({
            where: {
                cartId: cart.cartId,
                productId
            },
            defaults: {
                quantity: quantity > 1 ? quantity : 1
            }
        });

        if (!cartItem) {
            return res.status(500).json("Internal Server Error");
        }

        if (!cartItem._options.isNewRecord) {
            // The item already exists in the cart, update the quantity
            await cartItem.update({
                quantity: quantity > 1 ? quantity : 1
            });
        }

        return res.status(200).json("Added to cart");

    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};


exports.getCart = async(req,res) => {
    try {
        const {id} = req.params

        const cart = await Cart.findOne({
            where:{
                userId: id,
            },
            include:[
                {
                    model: CartItems,
                    include:[
                        {
                            model: Product,
                            attributes:['productId','name','price']
                        },
                    ],
                    attributes:['cartId','quantity']
                }
            ],
            attributes: ['cartId','userId']
        })

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found for the user' });
        }
      
        return res.status(200).json(cart);

    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.reduceQuantity = async(req,res) => {
    try {
        const {cartId,quantity,productId} = req.body 
        const item = await CartItems.findOne({where: {
            cartId,
            productId
        }})
        item.quantity = quantity
        await item.save()
        return res.status(200).json("changed the quantity")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.removeFromCart = async(req,res) => {
    try {
        const {cartId,productId} = req.body 
        await CartItems.destroy({
            where:{
                cartId,
                productId
            }
        })
        return res.status(200).json("item removed from cart")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}