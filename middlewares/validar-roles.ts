import { Request, Response } from 'express';

// -----------------------------------------------------
export const esAdminRole = ( req : Request, res : Response, next : Function ) => {
    // verificar si el token esta validado
    if ( ! req.body.usuario ){
        return res.status( 500 ).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }
    
    const  { rol, nombre } = req.body.usuario;

    if ( rol !== 'ADMIN_ROLE' ){
        return res.status( 401 ).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}
// -----------------------------------------------------
export const tieneRole = ( roles : Array<string> ) => {

    return ( req : Request, res : Response, next : Function ) => {
        // verificar si el token esta validado
        if ( ! req.body.usuario ){
            return res.status( 500 ).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if ( ! roles.includes( req.body.usuario.rol ) ) {
            return res.status( 401 ).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            });
        }

        next();
    }
}
// -----------------------------------------------------