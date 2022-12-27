import { Response, Request } from "express";
import bcryptjs from 'bcryptjs';

import { Usuario } from "../models/index.js";

// -----------------------------------------------------
export const usuariosGet = async (req : Request, res : Response) => {
    // const { q, nombre, apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // esta es una forma de hacer lo mismo del Promise.all 
    // pero Promise.all se demora mucho menos
    // const usuarios = await Usuario.find( query )
    //     .skip( Number( desde ) )
    //     .limit( Number( limite ) );
    // const total = await Usuario.countDocuments( query );

    const [ total, usuarios ] = await Promise.all( [
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ] );

    res.json({
        total,
        usuarios
    })
}

// -----------------------------------------------------
export const usuariosPost = async (req : Request, res : Response) => {
    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // encryptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );     //hashSync encrypta en una sola via

    await usuario.save();

    res.status(201).json({
        usuario
    })
}

// -----------------------------------------------------
export const usuariosPut = async ( req : Request, res : Response) => {
    const { id } = req.params;

    // _id es extraido para validar el _id que viene dentro 
    // del body y evitar que explote el servidor
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );     //hashSync encrypta en una sola via
    }
    await Usuario.findByIdAndUpdate( id, resto );
    const usuario = await Usuario.findById( id );

    res.json( {usuario} );
}

// -----------------------------------------------------
export const usuariosDelete = async (req : Request, res : Response) => {
    const { id } = req.params;

    // esto es para borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json( usuario )
}

// -----------------------------------------------------
export const usuariosPatch = (req : Request, res : Response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}

// -----------------------------------------------------