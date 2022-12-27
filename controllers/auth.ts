import { Response, Request } from "express";
import bcryptjs from 'bcryptjs';

import { Usuario } from '../models/index.js';
import { generarJWT, googleVerify } from "../helpers/index.js";


// -----------------------------------------------------
export const login = async ( req : Request, res : Response ) => {

    const { correo, password } = req.body;

    try {
        // verificar si el correo existe
        const usuario = await Usuario.findOne( { correo } );
        if ( ! usuario ) {
            return res.status( 400 ).json( {
                msg: "Usuario o contraseña incorrectos - correo"
            });
        }
        
        // verificar si el usuario esta activo
        if ( ! usuario.estado ) {
            return res.status( 400 ).json( {
                msg: "Usuario o contraseña incorrectos - estado: false"
            });
        }

        // verificar la clave
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( ! validPassword ) {
            return res.status( 400 ).json( {
                msg: "Usuario o contraseña incorrectos - password"
            });
        }
        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        }); 
    } catch (error) {
        console.log(error);
        return res.status( 500 ).json({
            msg: "Hable con el administrador"
        });
    }    
}
// -----------------------------------------------------
export const googleSignin = async ( req : Request, res : Response ) => {
    const { id_token } = req.body;

    try {
        const verify = await googleVerify( id_token );
        const correo = verify?.correo;
        const nombre = verify?.nombre;
        const img    = verify?.img;

        let usuario = await Usuario.findOne( { correo } );

        if ( ! usuario ) {
            // crear un usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario( data );
            await usuario.save();
        }

        // si el usuario esta bloqueado
        if ( !usuario.estado ){
            return res.status( 401 ).json({
                msg: 'Hable con el administrador - usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log( error );
        res.status( 400 ).json({
            msg: 'Token de Google no válido.'
        });
    }

}
// -----------------------------------------------------