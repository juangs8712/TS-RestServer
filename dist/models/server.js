var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { authRouter, categoryRouter, productRouter, searchRouter, uploadsRouter, userRouter } from '../routes/index.js';
import { dbConnection } from '../database/config.js';
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default class Server {
    // -----------------------------------------------------
    constructor() {
        this.path = {
            auth: '/api/auth',
            category: '/api/categorias',
            search: '/api/buscar',
            product: '/api/productos',
            uploads: '/api/uploads',
            user: '/api/usuarios',
        };
        this.app = express();
        this.port = process.env.PORT;
        // conectar a base de datos
        this.conectarDB();
        // middlewares
        this.middlewares();
        // rutas de mi applicacion
        this.routes();
    }
    // -----------------------------------------------------
    conectarDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection();
        });
    }
    // -----------------------------------------------------
    middlewares() {
        // CORS
        this.app.use(cors());
        // parseo y lectura del body
        // con esto especifico que el body viene en formato json
        this.app.use(express.json());
        // directorio publico
        this.app.use(express.static('public'));
        // File upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    // -----------------------------------------------------
    routes() {
        this.app.use(this.path.auth, authRouter);
        this.app.use(this.path.category, categoryRouter);
        this.app.use(this.path.product, productRouter);
        this.app.use(this.path.search, searchRouter);
        this.app.use(this.path.uploads, uploadsRouter);
        this.app.use(this.path.user, userRouter);
    }
    // -----------------------------------------------------
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//# sourceMappingURL=server.js.map