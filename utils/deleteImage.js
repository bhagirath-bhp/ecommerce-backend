const {s3Client} = require('../utils/s3Client')
const {DeleteObjectCommand} = require('@aws-sdk/client-s3')
const fs = require('fs')

exports.deleteImage = async(res,imageName) => {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageName
        })

        const response = await s3Client.send(command)
        console.log(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error")
    }
}