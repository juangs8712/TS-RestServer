import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { Usuario, Categoria, Producto } from "../models/index.js";


// -----------------------------------------------------
const coleccionesPermitidas = [
    "categorias",
    "usuarios",
    "productos",
    "roles"
];

const idNoValido = 'Este ID no corresponde a la coleccion especificada';

// -----------------------------------------------------
const buscarCategoria = async ( termino = '', res : Response ) => {
    const esMongoID = isValidObjectId( termino );

    if ( esMongoID ) {
        const coleccion = await Categoria.findById( termino );
        if ( coleccion ) {
            return res.json( { 
                results: [ coleccion ]
            });            
        }
    }

    // hacer la busqueda insensible a mayusculas y minusculas
    const regex = RegExp( termino, 'i' );    
    
    // con .count se cuentan los registros devueltos por la consulta
    // const users = await Usuario.count( {  
    const categorias = await Categoria.find( { nombre: regex , estado: true } );

    return res.json({
        results: categorias? categorias : []
    })  
}

// -----------------------------------------------------
const buscarUsuario = async ( termino = '', res : Response ) => {
    const esMongoID = isValidObjectId( termino );

    if ( esMongoID ) {
        const coleccion = await Usuario.findById( termino );
        if ( coleccion ) {
            return res.json( { 
                results: [ coleccion ]
            });            
        }
    }

    // hacer la busqueda insensible a mayusculas y minusculas
    const regex = RegExp( termino, 'i' );    

    const users = await Usuario.find( { 
        $or:  [ { nombre: regex }, { correo: regex } ],
        $and: [ { estado: true } ]
    } );

    return res.json({
        results: users? users : []
    })  
}

// -----------------------------------------------------
const buscarProducto = async ( termino = '', res : Response ) => {
    const esMongoID = isValidObjectId( termino );

    if ( esMongoID ) {
        const coleccion = await Producto.findById( termino )
            .populate( 'categoria', 'nombre');
        if ( coleccion ) {
            return res.json( { 
                results: [ coleccion ]
            });            
        }
    }

    // hacer la busqueda insensible a mayusculas y minusculas
    const regex = RegExp( termino, 'i' );    
    
    // con .count se cuentan los registros devueltos por la consulta
    // const users = await Usuario.count( {  
    const productos = await Producto.find( { 
        $or:  [ { nombre: regex }, { descripcion: regex } ],
        $and: [ { estado: true } ]
    } ).populate( 'categoria', 'nombre');;

    return res.json({
        results: productos? productos : []
    })  
}

// -----------------------------------------------------
export const buscar = async ( req : Request, res : Response ) => {
    const { coleccion, termino } = req.params;

    if ( ! coleccionesPermitidas.includes( coleccion ) ) {
        return res.status( 400 ).json({
            msg: `Las colecciones permitidas son: [ ${ coleccionesPermitidas } ]`
        });
    }

    switch ( coleccion ) {
        case 'categorias':
            await buscarCategoria( termino, res );        
        break;
        case 'usuarios':
            await buscarUsuario( termino, res );
        break;
        case 'productos':
            await buscarProducto( termino, res );                
        break;
        default:
            return res.status( 500 ).json({
                msg: 'Se le olvidó hacer esta búsqueda.'
            })
            break;
    }

    
}
// -----------------------------------------------------