var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Producto, Usuario } from "../models/index.js";
import { checkColectionAndId } from '../helpers/index.js';
// -----------------------------------------------------
const coleccionesPermitidas = [
    { name: 'productos', colection: Producto },
    { name: 'usuarios', colection: Usuario }
];
// -----------------------------------------------------
export const checkUploadsParam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield checkColectionAndId(req, coleccionesPermitidas);
    }
    catch (error) {
        return res.status(400).json({ msg: error.message });
    }
    next();
});
// -----------------------------------------------------
//# sourceMappingURL=validar-uploads-param.js.map