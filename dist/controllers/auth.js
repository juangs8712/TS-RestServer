var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/index.js';
import { generarJWT, googleVerify } from "../helpers/index.js";
// -----------------------------------------------------
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        // verificar si el correo existe
        const usuario = yield Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario o contraseña incorrectos - correo"
            });
        }
        // verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario o contraseña incorrectos - estado: false"
            });
        }
        // verificar la clave
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario o contraseña incorrectos - password"
            });
        }
        // Generar el JWT
        const token = yield generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }
});
// -----------------------------------------------------
export const googleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const verify = yield googleVerify(id_token);
        const correo = verify === null || verify === void 0 ? void 0 : verify.correo;
        const nombre = verify === null || verify === void 0 ? void 0 : verify.nombre;
        const img = verify === null || verify === void 0 ? void 0 : verify.img;
        let usuario = yield Usuario.findOne({ correo });
        if (!usuario) {
            // crear un usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario = new Usuario(data);
            yield usuario.save();
        }
        // si el usuario esta bloqueado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador - usuario bloqueado'
            });
        }
        // Generar el JWT
        const token = yield generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no válido.'
        });
    }
});
// -----------------------------------------------------
//# sourceMappingURL=auth.js.map