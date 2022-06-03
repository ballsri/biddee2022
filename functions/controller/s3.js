

// require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const access = process.env.AWS_ACCESS_KEY;
const secret = process.env.AWS_SECRET_KEY;

const AWS = require('aws-sdk')
AWS.config.update({
    region: bucketRegion,
    credentials:{
        accessKeyId: access,
        secretAccessKey: secret

    }
})

const S3 = require('aws-sdk/clients/s3')
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

const s3 = new S3({
    bucketRegion,
    credentials:{
        accessKeyId: access,
        secretAccessKey: secret
    }

})

function uploadFile(file){
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

function getFileStream(fileKey){
    const downloadParams ={
        Key : fileKey,
        Bucket : bucketName

    }
    return s3.getObject(downloadParams).createReadStream();

}

module.exports = {uploadFile , getFileStream};
