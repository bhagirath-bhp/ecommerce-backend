const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const sequelize = require('./db/db.js')
const userRoute = require('./routes/userRoutes.js')
const productRoute = require('./routes/productRoutes.js')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// logging
app.use(morgan("tiny"))

//file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

//cors
app.use(cors({
    origin: "*",
    allowedHeaders: ["*"]
}))

app.use("/api/v1",userRoute)
app.use("/api/v1",productRoute)

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