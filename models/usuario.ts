import { Schema, model } from 'mongoose'


// -----------------------------------------------------
export const UsuarioSchema = new Schema({
    nombre:   { type: String, required: [ true, 'El nombre es obligatorio' ] },
    correo:   { type: String, required: [ true, 'El correo es obligatorio' ], unique: true },
    password: { type: String, required: [ true, 'La contraseña es obligatoria'] },
    rol:      { type: String, default: "USER_ROLE", required: true, enum: ['ADMIN_ROLE', 'USER_ROLE'] },
    img:      { type: String },
    estado:   { type: Boolean, default: true },
    google:   { type: Boolean, default: false },
});

// -----------------------------------------------------
UsuarioSchema.methods.toJSON = function (){
    // con esta funcion se extrae la version(__v) y la contraseña
    // entonces usuario se queda con el resto de los campos del objeto
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
} 
// -----------------------------------------------------

export default model( 'Usuario', UsuarioSchema );