const Clientes = require('../models/Clientes');

//agrega un nuevo cliente
exports.nuevoCliente = async (req,res) => {
    const cliente = new Clientes(req.body);

    try {
        //almacenar el registro
        await cliente.save();
        res.json({ mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        // si hay un error, console.log y next
        console.log(error);
        next();
    }
}

//Muestra todos los clientes

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    }catch (error){
        console.log(error);
        next();
    }
}

// Muestra un cliente por su ID
exports.mostrarCliente = async (req,res,next) => {
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente){
        res.json({mensaje: 'Ese cliente no existe'});
        next()
    }
    //Mostrar cliente
    res.json(cliente);
}

// Actualizar un cliente por su Id
exports.actualizarCliente = async (req,res,next) => {
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.idCliente }, req.body,{
            new : true
        });
        res.json(cliente);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar un cliente por su ID
exports.eliminarCliente = async (req,res,next) => {
    try {
        await Clientes.findOneAndDelete({ _id: req.params.idCliente });
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}