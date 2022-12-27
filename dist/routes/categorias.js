import { Router } from 'express';
import { check } from 'express-validator';
import { existeCategoriaById } from '../helpers/index.js';
import { categoriaDelete, categoriaPut, crearCategoria, obtenerCategorias, obtenerCategoriaById } from '../controllers/index.js';
import { esAdminRole, validarCampos, validarJWT } from '../middlewares/index.js';
// -----------------------------------------------------
const router = Router();
// -----------------------------------------------------
// obtener todas las categorias - publico
router.get('/', obtenerCategorias);
// -----------------------------------------------------
// obtener una categoria por id - publico
router.get('/:id', [
    check("id", "No es un ID válido").isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], obtenerCategoriaById);
// -----------------------------------------------------
// Crear una categoria - privado - cualquier persona con un toquen valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);
// -----------------------------------------------------
// Actualizar categoria - privado - cualquier persona con un toquen valido
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoriaById),
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], categoriaPut);
// -----------------------------------------------------
// borrar categoria - privado - solo administradores
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check('id').custom(existeCategoriaById),
], categoriaDelete);
// -----------------------------------------------------
export default router;
// -----------------------------------------------------
//# sourceMappingURL=categorias.js.map