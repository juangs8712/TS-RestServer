
import mongoose, { Schema, model } from 'mongoose';

// -----------------------------------------------------
export const CategoriaSchema = new Schema({
    nombre: { type: String, unique: true, required: [ true, 'El nombre es obligatorio' ] },
    estado: { type: Boolean,  default: true, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true }
});
// -----------------------------------------------------
CategoriaSchema.methods.toJSON = function (){
    // con esta funcion se extrae la version(__v) y la contraseña
    // entonces usuario se queda con el resto de los campos del objeto
    const { __v, estado, ...data } = this.toObject();
    
    return data;
}
// -----------------------------------------------------

export default model( 'Categoria', CategoriaSchema );
