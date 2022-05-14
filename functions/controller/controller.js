const UploadModel = require('../models/image');
const fs = require('fs');
const arraySchema = require('../models/cars')
const carProperties = require('../models/carProperties')
const jwt_decode = require('jwt-decode')
const User = require('../models/users');
const Bidder = require('../models/bidders');
const {uploadFile} = require('./s3.js')

const util = require('util');
const unlinkFile = util.promisify(fs.unlink);

exports.home = async (req, res) => {
    const all_images = await UploadModel.find();
    var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }
    res.render('registerCar', {title:"REGISTER CAR", images : all_images, user:user });
}

exports.uploads = async (req, res , next) => {
    const files = req.files;
    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    // convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64')
    })
    if(imgArray.length > 30){
        return next(new Error('You can only upload a maximum of 30 files'));
    }

    // upload s3
    files.forEach( async file => {
        await uploadFile(file);
    });


    let result = imgArray.map(  (src, index) => {

        // create object to store data in the collection
        
        let finalImg = {
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            // imageBase64 : src,
            path: files[index].path.substring(6,files[index].path.length)
        }

        let newUpload = new UploadModel(finalImg);

        return newUpload;
    });

       
        var newCar = new carProperties({
            make : req.body.Make,
            model : req.body.Model,
            year : req.body.Year,
            vinNumber : req.body.Vin__number,
            engineSize: req.body.Engine__size,
            transmission: req.body.Trasmission,
            milage: req.body.Milage,
            regisYear: req.body.Registration__year,
            color: req.body.Color,
            modifyList: req.body.Modification,
            location: req.body.Location,
            openPrice: req.body.Open__price,
            description: req.body.description
        })
        

    // console.log(req.body)
    var userId = jwt_decode(req.session.token).id;
    var arrayOfSchema = new arraySchema({userId:userId,arrayOfImage : result, carProp : newCar,lastPrice:newCar.openPrice})
    arrayOfSchema.save()
    var user = await User.findById(userId);
    // user.carsSell.push(arrayOfSchema._id);
    user.save()
    
    Promise.all(result)
        .then( msg => {
            res.redirect('/user/mylist')
            console.log("start")
            result.map( file =>{
                console.log("Error")
                unlinkFile("./public"+file.path)
                console.log("Here")
            })
            console.log("stop")
        })
        .catch(err =>{
            res.json(err);
        })
}