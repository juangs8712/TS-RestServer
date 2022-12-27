import { Request, Response } from "express";

import { Producto, Usuario } from "../models/index.js";
import { checkColectionAndId } from '../helpers/index.js';

// -----------------------------------------------------
const coleccionesPermitidas = [
    { name: 'productos',  colection: Producto },
    { name: 'usuarios',   colection: Usuario }
];

// -----------------------------------------------------
export const checkUploadsParam = async ( req : Request, res : Response, next : Function ) => {
    try {
        await checkColectionAndId( req, coleccionesPermitidas );
    } catch ( error : any ) {
        return res.status( 400 ).json( { msg: error.message } );
    }
    next();
}
// -----------------------------------------------------