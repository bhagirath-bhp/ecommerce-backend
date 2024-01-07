const stripe = require('stripe')(process.env.STRIPE_SK)

exports.createSession = async(line_items,id) => {
    try {
        const session = await stripe.checkout.sessions.create({
            currency: 'inr',
            client_reference_id: id, // order_id
            line_items: line_items,
            phone_number_collection:{
                enabled:true
            },
            shipping_options:[{
                shipping_rate_data:{
                    display_name:'Shipping charges',
                    delivery_estimate:{
                        maximum:{
                            value:10,
                            unit: 'business_day'
                        },
                        minimum:{
                            value:7,
                            unit:'business_day'
                        }
                    },
                    fixed_amount:{
                        amount:100*100,
                        currency:"inr"
                    },
                    type: 'fixed_amount'
                }
            }],
            success_url:"http://localhost:5713/success",
            cancel_url:"http://localhost:5713/cancel",
            mode: "payment"
        })

        return session.id
    } catch (error) {
        console.error(error);
    }
}