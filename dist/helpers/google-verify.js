var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// -----------------------------------------------------
export const googleVerify = (idToken = '') => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    // cons "name: nombre" se desestructura "name as nombre"
    const token = ticket.getPayload();
    if (token != undefined) {
        const { name: nombre, email: correo, picture: img } = token;
        return { nombre, correo, img };
    }
});
// -----------------------------------------------------
//# sourceMappingURL=google-verify.js.map