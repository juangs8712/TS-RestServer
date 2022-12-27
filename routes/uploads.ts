import { Router } from 'express';
import { check } from 'express-validator';


import { 
    // cargarArchivo, 
    actualizarImagenCloudinary,
    mostrarImagenCloudinary
} from '../controllers/index.js';
import { 
    checkUploadsParam, 
    validarArchivoSubir, 
    validarCampos 
} from '../middlewares/index.js';


// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------

// router.post( '/', validarArchivoSubir, cargarArchivo ); // este sube los archivos a local
router.post( '/', validarArchivoSubir, actualizarImagenCloudinary );
// -----------------------------------------------------
// esta es otra forma de validar un parametro
// check( 'coleccion' ).custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
router.put( '/:coleccion/:id', [
    check( 'id', 'El id deber ser de mongo' ).isMongoId(),
    validarArchivoSubir,
    validarCampos,
    checkUploadsParam
], actualizarImagenCloudinary );
// -----------------------------------------------------
router.get('/:coleccion/:id', [
    check( 'id', 'El id deber ser de mongo' ).isMongoId(),
    validarCampos,
    checkUploadsParam
], mostrarImagenCloudinary );
// -----------------------------------------------------

// -----------------------------------------------------

// -----------------------------------------------------

export default router;
// -----------------------------------------------------
