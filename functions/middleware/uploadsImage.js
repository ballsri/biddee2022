const multer = require('multer');

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, 'public/uploads')
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        var name = file.fieldname + '-' + Date.now() + ext;
        cb(null, name)
    }
})

module.exports = store = multer({ storage : storage })
