const Spell = require('../models/spells')
const CartItem = require('../models/cartItems')

CartItem.hasOne(Spell,{foreignKey: 'spellId'})

exports.addSpell = async(req,res) => {
    try {
        const {name,description, collectionId} = req.body;

        if (!name || !description || !collectionId){
            // return res.status(400).json("name, description or collectionId is missing")
            return res.status(400).json(`name, description or collectionId is missing, ${name} : ${description} : ${collectionId}`)
        }

        await Spell.create({
            name,
            description,
            collectionId
        })

        return res.status(200).json("spell added")
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}

exports.getAllSpells = async(req,res) => {
    const {id} = req.params
    try {
        const spells = await Spell.findAll({
            where:{
                "collectionId": id
            }
        })

        return res.status(200).json(spells)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}