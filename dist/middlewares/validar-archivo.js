// -----------------------------------------------------
export const validarArchivoSubir = (req, res, next) => {
    if (!req.files || !req.files.archivo || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: 'No hay archivo en la petición - validarArchivoSubir.' });
    }
    next();
};
// -----------------------------------------------------
//# sourceMappingURL=validar-archivo.js.map