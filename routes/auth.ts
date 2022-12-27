import { Router } from 'express';
import { check } from 'express-validator';

import { googleSignin, login } from '../controllers/index.js';
import { validarCampos } from '../middlewares/index.js';


// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login
);
// -----------------------------------------------------
router.post('/google', [
    check('id_token', 'El id_token es necesario').notEmpty(),
    validarCampos
], googleSignin
);

// -----------------------------------------------------
export default router;
// -----------------------------------------------------
