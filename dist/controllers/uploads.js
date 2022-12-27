var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { subirArchivo } from "../helpers/index.js";
// -----------------------------------------------------
// cloudinary.config( process.env.CLOUDINARY_URL );
// -----------------------------------------------------
export const cargarArchivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const nombre = await subirArchivo( req.files, [ 'txt', 'md' ], 'textos' );   
        // el undefined es para que cargue los argumentos por defecto 
        const nombre = yield subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });
    }
    catch (msg) {
        res.status(400).json({ msg });
    }
});
// -----------------------------------------------------
export const actualizarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Esta funcion es para guardar los datos en el mismo host donde
        se encuentra corriendo el servidor (localhost, heroku...)
    */
    const { coleccion } = req.params;
    const modelo = req.body.coleccion;
    // limpiar imagenes previas
    if (modelo.img) {
        const __dirname = path.resolve();
        const pathImagen = path.join(__dirname, '/uploads', coleccion, modelo.img);
        // preguntar si la imagen existe en el directorio ../uploads/colecion/...
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen); // esto borra la imagen del directorio uploads
        }
    }
    modelo.img = yield subirArchivo(req.files, undefined, coleccion);
    modelo.save();
    res.json(modelo);
});
// -----------------------------------------------------
export const mostrarImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*
        Esta funcion es para obtener los datos en el mismo host donde
        se encuentra corriendo el servidor (localhost, heroku, ...)
    */
    const { coleccion } = req.params;
    const modelo = req.body.coleccion;
    const __dirname = path.resolve();
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '/uploads', coleccion, modelo.img);
        // preguntar si la imagen existe en el directorio ../uploads/colecion/...
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }
    const pathPlaceholder = path.join(__dirname, '/assets/no-image.jpg');
    res.sendFile(pathPlaceholder);
});
// -----------------------------------------------------
// Actualizar una imagen hacia claudinary
export const actualizarImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // configurar cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const modelo = req.body.coleccion;
    // limpiar imagenes previas
    if (modelo.img) {
        const index = modelo.img.lastIndexOf('/');
        const imgFileName = modelo.img.substring(index + 1);
        const public_id = imgFileName.substring(0, imgFileName.lastIndexOf('.'));
        cloudinary.uploader.destroy(public_id);
    }
    const fileArray = req.files.archivo;
    const file = Array.isArray(fileArray)
        ? fileArray[0]
        : fileArray;
    try {
        // subir la imagen a cloudinary
        const { secure_url } = yield cloudinary.uploader.upload(file.tempFilePath);
        modelo.img = secure_url;
        // Eliminar el fichero temporal creado en la carpeta tmp
        fs.unlinkSync(file.tempFilePath);
        // guardar el modelo en mongo
        console.log(modelo);
        yield modelo.save();
        res.json(modelo);
    }
    catch (error) {
        res.json({ error });
    }
});
// -----------------------------------------------------
// obtener la imagen desde claudinary
export const mostrarImagenCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modelo = req.body.coleccion;
    if (modelo.img) {
        return res.redirect(modelo.img);
    }
    const __dirname = path.resolve();
    const pathPlaceholder = path.join(__dirname, '/assets/no-image.jpg');
    res.sendFile(pathPlaceholder);
});
// -----------------------------------------------------
//# sourceMappingURL=uploads.js.map