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
export const ProductoSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es obligatorio'] },
    estado: { type: Boolean, default: true, required: true },
    precio: { type: Number, default: 0 },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String },
});
// -----------------------------------------------------
ProductoSchema.methods.toJSON = function () {
    // con esta funcion se extrae la version(__v) y la contraseña
    // entonces usuario se queda con el resto de los campos del objeto
    const _a = this.toObject(), { __v, estado } = _a, data = __rest(_a, ["__v", "estado"]);
    return data;
};
// -----------------------------------------------------
export default model('Producto', ProductoSchema);
//# sourceMappingURL=producto.js.map