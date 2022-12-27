import { Router } from 'express';
import { check } from 'express-validator';

import { 
    validarCampos, 
    validarJWT, 
    esAdminRole, 
    tieneRole 
} from '../middlewares/index.js';

import { 
    esRoleValido, 
    emailExiste, 
    existeUsuarioById 
} from '../helpers/index.js';

import { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch, 
} from '../controllers/usuarios.js';

// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------
router.get('/', usuariosGet);
// -----------------------------------------------------
router.put('/:id', 
    [
        check("id", "No es un ID válido").isMongoId(),
        check( 'id' ).custom( existeUsuarioById ),
        check('rol').custom( esRoleValido ),
        validarCampos
    ],
    usuariosPut);
// -----------------------------------------------------
router.post('/',
    // estos son middlewares
    [
        check('nombre', 'El  nombre es obligatorio').notEmpty(),
        check('correo', 'El  correo no es válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres.').isLength({ min: 6 }),
        check('correo').custom( emailExiste ),
        // check('rol', 'El rol no es válido.').isIn( [ 'ADMIN_ROLE', 'USER_ROLE' ] ),
        check('rol').custom( esRoleValido ),
        validarCampos        
    ],
    usuariosPost
);
// -----------------------------------------------------
router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole( [ 'ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE' ] ),
    check("id", "No es un ID válido").isMongoId(),
    check( 'id' ).custom( existeUsuarioById ),
    validarCampos
], usuariosDelete);
// -----------------------------------------------------
router.patch('/', usuariosPatch);
// -----------------------------------------------------
export default router;