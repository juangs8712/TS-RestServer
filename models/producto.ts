
import { Schema, model } from 'mongoose';

// -----------------------------------------------------
export const ProductoSchema = new Schema({
    nombre:      { type: String, unique: true, required: [ true, 'El nombre es obligatorio' ] },
    estado:      { type: Boolean, default: true, required: true },
    precio:      { type: Number, default: 0 },
    usuario:     { type: Schema.Types.ObjectId, ref: 'Usuario',   required: true },
    categoria:   { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String },
    disponible:  { type: Boolean, default: true },
    img:         { type: String },
});
// -----------------------------------------------------
ProductoSchema.methods.toJSON = function (){
    // con esta funcion se extrae la version(__v) y la contraseña
    // entonces usuario se queda con el resto de los campos del objeto
    const { __v, estado, ...data } = this.toObject();
    
    return data;
}
// -----------------------------------------------------

export default model( 'Producto', ProductoSchema );
