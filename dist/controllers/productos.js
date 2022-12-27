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
import { Producto, Categoria } from '../models/index.js';
// -----------------------------------------------------
// Obtener Productos - paginado - total - populate
export const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    const [total, productos] = yield Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    // categorias 
    res.json({
        total,
        productos
    });
});
// -----------------------------------------------------
// Obtener Productos por id - populate
export const obtenerProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json({
        producto
    });
});
// -----------------------------------------------------
// Crear Productos
export const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { usuario, nombre, estado } = _a, resto = __rest(_a, ["usuario", "nombre", "estado"]);
    // validar si el producto ya existe en la BD 
    const productoDB = yield Producto.findOne({ nombre: nombre.toUpperCase() });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe.`
        });
    }
    const data = Object.assign(Object.assign({}, resto), { nombre: nombre.toUpperCase(), usuario: req.body.usuario._id });
    const producto = new Producto(data);
    // await producto.save( { new: true } );
    yield producto.save();
    res.status(201).json(producto);
});
// -----------------------------------------------------
// Actualizar categoria
export const productoPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { estado, usuario, categoria } = _b, data = __rest(_b, ["estado", "usuario", "categoria"]);
    data.usuario = req.body.usuario._id;
    try {
        // verificar la categoria
        if (categoria) {
            const category = yield Categoria.findById(categoria);
            data.categoria = category;
        }
    }
    catch (error) {
        return res.status(400).json({
            msg: `El ID: ${categoria} no corresponde a ninguna categoria.`
        });
    }
    // el { new: true } es para que producto quede con la informacion actualizada
    const producto = yield Producto.findByIdAndUpdate(id, data, { new: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
});
// -----------------------------------------------------
// borrar producto - estado: false
export const productoDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const producto = yield Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(producto);
});
// -----------------------------------------------------
//# sourceMappingURL=productos.js.map