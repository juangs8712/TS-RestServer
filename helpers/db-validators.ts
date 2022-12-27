
import { Request } from "express";

import { Categoria, Producto, Role, Usuario } from "../models/index.js";

// -----------------------------------------------------
export const esRoleValido = async( rol = '' ) => {
    const existeRole = await Role.findOne({ rol });

    if ( !existeRole ){
        throw new Error( `El rol ${ rol } no está registrado en la BD.` )
    }
}
// -----------------------------------------------------
// export default esRoleValido;
// -----------------------------------------------------
export const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo } );
    if ( existeEmail ){
        throw new Error( `El correo ${ correo } ya está registrado.` )
    }
}
// -----------------------------------------------------
export const existeUsuarioById = async( id : string ) => {
    const existeUsuario = await Usuario.findById( id )
    
    if ( !existeUsuario ){
        throw new Error( `El ID: ${ id } no existe en usuarios.` )
    }
}
// -----------------------------------------------------
export const existeCategoriaById = async( id : string ) => {
    const categoria = await Categoria.findById( id )

    if ( !categoria ){
        throw new Error( `El ID: ${ id } no existe en categorias.` )
    }
}
// -----------------------------------------------------
export const existeProductoById = async( id : string ) => {
    const producto = await Producto.findById( id )

    if ( !producto ){
        throw new Error( `El ID: ${ id } no existe en productos.` )
    }
}
// -----------------------------------------------------
export const coleccionesPermitidas = ( 
    coleccion = '', 
    colecciones : Array< any > 
) => {
    const incluida = colecciones.includes( coleccion );
    
    if ( ! incluida ) {
        console.log( 'coleccionesPermitidas');
        throw new Error( `La colección ${ coleccion } no es permitida - [ ${ colecciones } ]` );
    }

    return true;
}
// -----------------------------------------------------

export const checkColectionAndId = async( 
    req : Request,
    colecciones : Array< any > ) => {

    const { id, coleccion } = req.params;
    const Colection = colecciones.find( c => c.name === coleccion );

    // comprobar que la coleccion este contenida dentro de colecciones
    if ( ! Colection  ){
        throw new Error ( `La colección '${ coleccion }' no está permitida` );
    }

    // comprobar si el id se encuentra en la coleccion especificada
    const existId = await Colection.colection.findById( id );          
    if ( ! existId ) {
        throw new Error( `El Id '${ id }' no se encuentra en la colección '${ coleccion }'` );
    } 
    
    // agregar el usuario/producto al Request
    req.body.coleccion = existId;
   
    return true;
}
// -----------------------------------------------------
