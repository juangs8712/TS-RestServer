var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Categoria } from '../models/index.js';
// -----------------------------------------------------
// Obtener categorias - paginado - total - populate
export const obtenerCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, categorias] = yield Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    // categorias 
    res.json({
        total,
        categorias
    });
});
// -----------------------------------------------------
// Obtener categoria - populate
export const obtenerCategoriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield Categoria.findById(id)
        .populate('usuario', 'nombre');
    res.json({
        categoria
    });
});
// -----------------------------------------------------
// Crear categorias
export const crearCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = yield Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe.`
        });
    }
    const data = {
        nombre,
        usuario: req.body.usuario._id
    };
    const categoria = new Categoria(data);
    yield categoria.save();
    res.status(201).json(categoria);
});
// -----------------------------------------------------
// Actualizar categoria
export const categoriaPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { estado, usuario } = _a, data = __rest(_a, ["estado", "usuario"]);
    data.usuario = req.body.usuario._id;
    // el { new: true } es para que categoria quede con la informacion actualizada
    const categoria = yield Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
});
// -----------------------------------------------------
// borrar categoria - estado: false
export const categoriaDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoria);
});
// -----------------------------------------------------
//# sourceMappingURL=categorias.js.map