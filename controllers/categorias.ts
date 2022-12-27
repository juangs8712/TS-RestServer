import { Request, Response } from "express"

import { Categoria } from '../models/index.js';

// -----------------------------------------------------
// Obtener categorias - paginado - total - populate
export const obtenerCategorias = async (req : Request, res : Response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all( [
        Categoria.countDocuments( query ),
        Categoria.find( query )
            .populate( 'usuario', 'nombre' )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ] );

    // categorias 
    res.json( {
        total,
        categorias
    })
}

// -----------------------------------------------------
// Obtener categoria - populate
export const obtenerCategoriaById = async ( req : Request, res : Response ) => {
    const { id } = req.params;

    const categoria = await Categoria.findById( id )
        .populate( 'usuario', 'nombre' );

    res.json({
        categoria
    })
}

// -----------------------------------------------------
// Crear categorias
export const crearCategoria = async ( req : Request, res : Response ) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne( { nombre } );

    if ( categoriaDB ){
        return res.status( 400 ).json( {
            msg: `La categoria ${ categoriaDB.nombre } ya existe.`
        } );
    }

    const data = {
        nombre,
        usuario: req.body.usuario._id
    }

    const categoria = new Categoria( data );

    await categoria.save();

    res.status( 201 ).json( categoria );
}

// -----------------------------------------------------
// Actualizar categoria
export const categoriaPut = async ( req : Request, res : Response ) => {
    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;
    data.usuario = req.body.usuario._id;

    // el { new: true } es para que categoria quede con la informacion actualizada
    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true } );

    res.json( categoria );
}

// -----------------------------------------------------
// borrar categoria - estado: false
export const categoriaDelete = async (req : Request, res : Response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( categoria )
}

// -----------------------------------------------------
