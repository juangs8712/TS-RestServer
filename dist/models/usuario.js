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
import { Schema, model } from 'mongoose';
// -----------------------------------------------------
export const UsuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    correo: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    rol: { type: String, default: "USER_ROLE", required: true, enum: ['ADMIN_ROLE', 'USER_ROLE'] },
    img: { type: String },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false },
});
// -----------------------------------------------------
UsuarioSchema.methods.toJSON = function () {
    // con esta funcion se extrae la version(__v) y la contraseña
    // entonces usuario se queda con el resto de los campos del objeto
    const _a = this.toObject(), { __v, password, _id } = _a, usuario = __rest(_a, ["__v", "password", "_id"]);
    usuario.uid = _id;
    return usuario;
};
// -----------------------------------------------------
export default model('Usuario', UsuarioSchema);
//# sourceMappingURL=usuario.js.map