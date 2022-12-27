import { Request, Response } from "express"

import { Producto, Categoria } from '../models/index.js';


// -----------------------------------------------------
// Obtener Productos - paginado - total - populate
export const obtenerProductos = async (req : Request, res : Response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all( [
        Producto.countDocuments( query ),
        Producto.find( query )
            .populate( 'usuario', 'nombre' )
            .populate( 'categoria', 'nombre' )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ] );

    // categorias 
    res.json({
        total,
        productos
    })
}

// -----------------------------------------------------
// Obtener Productos por id - populate
export const obtenerProductoById = async ( req : Request, res : Response ) => {
    const { id } = req.params;

    const producto = await Producto.findById( id )
        .populate( 'usuario', 'nombre' )
        .populate( 'categoria', 'nombre' );

    res.json({
        producto
    })
}

// -----------------------------------------------------
// Crear Productos
export const crearProducto = async ( req : Request, res : Response ) => {
    const { usuario, nombre, estado, ...resto } = req.body;
    
    // validar si el producto ya existe en la BD 
    const productoDB = await Producto.findOne( { nombre: nombre.toUpperCase() } );    
    if ( productoDB ){
        return res.status( 400 ).json( {
            msg: `El producto ${ productoDB.nombre } ya existe.`
        } );
    }

    const data = {
        ...resto,
        nombre: nombre.toUpperCase(),
        usuario: req.body.usuario._id
    }

    const producto = new Producto( data );

    // await producto.save( { new: true } );
    await producto.save(  );

    res.status( 201 ).json( producto );
}

// -----------------------------------------------------
// Actualizar categoria
export const productoPut = async ( req : Request, res : Response ) => {
    const { id } = req.params;

    const { estado, usuario, categoria, ...data } = req.body;
    data.usuario = req.body.usuario._id;

    try {
        // verificar la categoria
        if ( categoria ) {
            const category = await Categoria.findById( categoria );            
            data.categoria = category;
        }
    } catch (error) {
        return res.status( 400 ).json({
            msg: `El ID: ${ categoria } no corresponde a ninguna categoria.`
        })
    }

    // el { new: true } es para que producto quede con la informacion actualizada
    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } )
        .populate( 'usuario', 'nombre' )
        .populate( 'categoria', 'nombre' );

    res.json( producto );
}

// -----------------------------------------------------
// borrar producto - estado: false
export const productoDelete = async (req : Request, res : Response) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( producto )
}

// -----------------------------------------------------