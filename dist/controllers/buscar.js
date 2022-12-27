var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isValidObjectId } from "mongoose";
import { Usuario, Categoria, Producto } from "../models/index.js";
// -----------------------------------------------------
const coleccionesPermitidas = [
    "categorias",
    "usuarios",
    "productos",
    "roles"
];
const idNoValido = 'Este ID no corresponde a la coleccion especificada';
// -----------------------------------------------------
const buscarCategoria = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = isValidObjectId(termino);
    if (esMongoID) {
        const coleccion = yield Categoria.findById(termino);
        if (coleccion) {
            return res.json({
                results: [coleccion]
            });
        }
    }
    // hacer la busqueda insensible a mayusculas y minusculas
    const regex = RegExp(termino, 'i');
    // con .count se cuentan los registros devueltos por la consulta
    // const users = await Usuario.count( {  
    const categorias = yield Categoria.find({ nombre: regex, estado: true });
    return res.json({
        results: categorias ? categorias : []
    });
});
// -----------------------------------------------------
const buscarUsuario = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = isValidObjectId(termino);
    if (esMongoID) {
        const coleccion = yield Usuario.findById(termino);
        if (coleccion) {
            return res.json({
                results: [coleccion]
            });
        }
    }
    // hacer la busqueda insensible a mayusculas y minusculas
    const regex = RegExp(termino, 'i');
    const users = yield Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    return res.json({
        results: users ? users : []
    });
});
// -----------------------------------------------------
const buscarProducto = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    const esMongoID = isValidObjectId(termino);
    if (esMongoID) {
        const coleccion = yield Producto.findById(termino)
            .populate('categoria', 'nombre');
        if (coleccion) {
            return res.json({
                results: [coleccion]
            });
        }
    }
    // hacer la busqueda insensible a mayusculas y minusculas
    const regex = RegExp(termino, 'i');
    // con .count se cuentan los registros devueltos por la consulta
    // const users = await Usuario.count( {  
    const productos = yield Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{ estado: true }]
    }).populate('categoria', 'nombre');
    ;
    return res.json({
        results: productos ? productos : []
    });
});
// -----------------------------------------------------
export const buscar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: [ ${coleccionesPermitidas} ]`
        });
    }
    switch (coleccion) {
        case 'categorias':
            yield buscarCategoria(termino, res);
            break;
        case 'usuarios':
            yield buscarUsuario(termino, res);
            break;
        case 'productos':
            yield buscarProducto(termino, res);
            break;
        default:
            return res.status(500).json({
                msg: 'Se le olvidó hacer esta búsqueda.'
            });
            break;
    }
});
// -----------------------------------------------------
//# sourceMappingURL=buscar.js.map