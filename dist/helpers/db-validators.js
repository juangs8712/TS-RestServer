var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Categoria, Producto, Role, Usuario } from "../models/index.js";
// -----------------------------------------------------
export const esRoleValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRole = yield Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol ${rol} no está registrado en la BD.`);
    }
});
// -----------------------------------------------------
// export default esRoleValido;
// -----------------------------------------------------
export const emailExiste = (correo = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado.`);
    }
});
// -----------------------------------------------------
export const existeUsuarioById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUsuario = yield Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID: ${id} no existe en usuarios.`);
    }
});
// -----------------------------------------------------
export const existeCategoriaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield Categoria.findById(id);
    if (!categoria) {
        throw new Error(`El ID: ${id} no existe en categorias.`);
    }
});
// -----------------------------------------------------
export const existeProductoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield Producto.findById(id);
    if (!producto) {
        throw new Error(`El ID: ${id} no existe en productos.`);
    }
});
// -----------------------------------------------------
export const coleccionesPermitidas = (coleccion = '', colecciones) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        console.log('coleccionesPermitidas');
        throw new Error(`La colección ${coleccion} no es permitida - [ ${colecciones} ]`);
    }
    return true;
};
// -----------------------------------------------------
export const checkColectionAndId = (req, colecciones) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, coleccion } = req.params;
    const Colection = colecciones.find(c => c.name === coleccion);
    // comprobar que la coleccion este contenida dentro de colecciones
    if (!Colection) {
        throw new Error(`La colección '${coleccion}' no está permitida`);
    }
    // comprobar si el id se encuentra en la coleccion especificada
    const existId = yield Colection.colection.findById(id);
    if (!existId) {
        throw new Error(`El Id '${id}' no se encuentra en la colección '${coleccion}'`);
    }
    // agregar el usuario/producto al Request
    req.body.coleccion = existId;
    return true;
});
// -----------------------------------------------------
//# sourceMappingURL=db-validators.js.map