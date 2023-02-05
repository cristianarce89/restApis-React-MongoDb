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

//Mostrar todos los productos
exports.mostrarProductos = async (req,res,next) => {
    try {
        // obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos)
    } catch (error) {
        console.log(error);
        next();
    }
}

//Muestra un producto especifico por su ID
exports.mostrarProducto = async (req,res,next) => {
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto){
        res.json({mensaje: 'Ese producto no existe'});
        next();
    }
    //Mostrar el producto
    res.json(producto);
}

// Actualizar producto por ID
exports.actualizarProducto = async (req,res,next) => {
    try {

        let productoAnterior = await Productos.findById(req.params.idProducto);

        // construir un nuevo producto
        let nuevoProducto = req.body;

        // verificar si hay imagen nueva

        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto}, nuevoProducto, {
            new: true,
        });
        res.json(producto)

    }catch (error){
        console.log(error);
        next()
    }
}

//Eliminar un producto por ID
exports.eliminarProducto = async (req,res,next) => {
    try {
        await Productos.findByIdAndDelete({ _id : req.params.idProducto});
        res.json({mensaje : 'El producto se ha eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}