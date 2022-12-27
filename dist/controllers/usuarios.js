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
import bcryptjs from 'bcryptjs';
import { Usuario } from "../models/index.js";
// -----------------------------------------------------
export const usuariosGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { q, nombre, apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    // esta es una forma de hacer lo mismo del Promise.all 
    // pero Promise.all se demora mucho menos
    // const usuarios = await Usuario.find( query )
    //     .skip( Number( desde ) )
    //     .limit( Number( limite ) );
    // const total = await Usuario.countDocuments( query );
    const [total, usuarios] = yield Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);
    res.json({
        total,
        usuarios
    });
});
// -----------------------------------------------------
export const usuariosPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
    // encryptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt); //hashSync encrypta en una sola via
    yield usuario.save();
    res.status(201).json({
        usuario
    });
});
// -----------------------------------------------------
export const usuariosPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // _id es extraido para validar el _id que viene dentro 
    // del body y evitar que explote el servidor
    const _a = req.body, { _id, password, google, correo } = _a, resto = __rest(_a, ["_id", "password", "google", "correo"]);
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt); //hashSync encrypta en una sola via
    }
    yield Usuario.findByIdAndUpdate(id, resto);
    const usuario = yield Usuario.findById(id);
    res.json({ usuario });
});
// -----------------------------------------------------
export const usuariosDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // esto es para borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = yield Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
});
// -----------------------------------------------------
export const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador'
    });
};
// -----------------------------------------------------
//# sourceMappingURL=usuarios.js.map