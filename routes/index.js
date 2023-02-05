const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')

module.exports = function () {
    // Agregar nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    //Muestra un cliente en especifico
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    // Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar cliente por Id
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /********************PRODUCTOS ****************************/

    //Nuevos productos
    router.post('/productos',
    productosController.subirArchivo,
    productosController.nuevoProducto);

    //Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos);

    // Mostrar producto especifico por su ID
    router.get('/productos/:idProducto', productosController.mostrarProducto);

    //Actualizar productos
    router.put('/productos/:idProducto',
        productosController.subirArchivo,
        productosController.actualizarProducto
    )

    return router;
}