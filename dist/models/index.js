import { model } from 'mongoose';
import { CategoriaSchema } from './categoria.js';
import { RoleSchema } from './role.js';
import { ProductoSchema } from './producto.js';
import { UsuarioSchema } from './usuario.js';
import * as Server_1 from './server.js';
export { Server_1 as Server };
export const Categoria = model('Categoria', CategoriaSchema);
export const Role = model('Role', RoleSchema);
export const Producto = model('Producto', ProductoSchema);
export const Usuario = model('Usuario', UsuarioSchema);
//# sourceMappingURL=index.js.map