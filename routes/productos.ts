import { Router } from 'express';
import { check } from 'express-validator';


import { 
    crearProducto, 
    obtenerProductoById, 
    obtenerProductos, 
    productoDelete, 
    productoPut } from '../controllers/index.js';
import { existeCategoriaById, existeProductoById } from '../helpers/index.js';
import { esAdminRole, validarCampos, validarJWT } from '../middlewares/index.js';



// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------
// -----------------------------------------------------
// obtener todas las categorias - publico
router.get('/', obtenerProductos );

// -----------------------------------------------------
// obtener una categoria por id - publico
router.get('/:id', 
    [
        check("id", "No es un ID válido").isMongoId(),
        check( 'id' ).custom( existeProductoById ),
        validarCampos
    ], 
    obtenerProductoById
);

// -----------------------------------------------------
// Crear un producto - privado - cualquier persona con un toquen valido
router.post('/', 
    [
        validarJWT,
        check( 'nombre', 'El nombre es obligatorio' ).notEmpty(),
        check( 'precio', 'El precio tiene que ser un número' ).isNumeric(),
        check( 'categoria', 'No es un id de MongoDB válido' ).isMongoId(),
        check( 'categoria').custom( existeCategoriaById ),         
        validarCampos
    ], 
    crearProducto);

// -----------------------------------------------------
// Actualizar Producto - privado - cualquier persona con un toquen valido
router.put('/:id', 
    [
        validarJWT,
        check( 'id' ).custom( existeProductoById ),
        validarCampos
    ], 
    productoPut
);

// -----------------------------------------------------
// borrar categoria - privado - solo administradores
router.delete('/:id', 
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un ID válido").isMongoId(),
        check( 'id' ).custom( existeProductoById ),
    ],
    productoDelete
);
// -----------------------------------------------------
export default router;