const Productos = require('../models/Productos');


//MULTER PARA SUBIR ARCHIVOS
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter ={
    storage: fileStorage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req,file,cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFliter(req,file,cb){
        if(file.memitype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else {
            cb(new Error('Formato no válido'))
        }
    },
}

//Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

//sube un archivo
exports.subirArchivo = (req,res,next) => {
    upload(req,res, function(error) {
        if(error){
            res.json({mensaje: error})
        }
        return next();
    })
}

// agrega nuevos productos
exports.nuevoProducto = async (req,res,next) => {
    const producto = new Productos(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo producto'})
    } catch (error) {
        console.log(error);
        next();
    }
}