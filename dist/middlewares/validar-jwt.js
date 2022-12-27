var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';
// -----------------------------------------------------
export const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // el x-token se envia en el header desde el cliente (Ej. desde Postman)
    const token = req.header('x-token');
    // si el token no existe, retornar con un error 401
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        // obtener el uid del usuario
        const jwtPayload = jwt.verify(token, (_a = process.env.SECRETORPRIVATEKEY) !== null && _a !== void 0 ? _a : '');
        if ('string' === typeof jwtPayload) {
            throw new Error(jwtPayload);
        }
        const uid = jwtPayload.uid;
        // leer el usuario que corresponde al uid
        const usuario = yield Usuario.findById(uid.toString());
        // si el usuario no existe retorna con un error 401
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }
        // si el usuario.estado === false retorna un error 401
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }
        // agregar la informacion del usuario al request
        req.body.usuario = usuario;
        // ejecutar el middleware siguiente
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
});
// -----------------------------------------------------
//# sourceMappingURL=validar-jwt.js.map