const Spell = require('../models/spells')
const CartItem = require('../models/cartItems')

CartItem.hasOne(Spell,{foreignKey: 'spellId'})

exports.addSpell = async(req,res) => {
    try {
        const {name,description} = req.body

        await Spell.create({
            name,
            description
        })

        return res.status(200).json("spell added")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.getAllSpells = async(req,res) => {
    try {
        const spells = await Spell.findAll()

        return res.status(200).json(spells)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}