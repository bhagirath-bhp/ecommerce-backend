const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./db/db.js')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// logging
app.use(morgan("tiny"))

//cors
app.use(cors({
    origin: "*",
    allowedHeaders: ["*"]
}))

app.listen(process.env.PORT, () => {
    sequelize.authenticate()
    .then(() => {
        console.info(`DB connected`);
        console.log(`Server started on port ${process.env.PORT}`);
    })
    .catch(err => {
        console.error(err);
        process.exit(1)
    })
})