import app from "./src/app.js";                                 // Importa la aplicación principal (toda la configuración de Express)

const PORT = process.env.PORT || 3000;                          // Define el puerto donde correrá el servidor
                                                                // Usa el puerto del archivo .env o, si no existe, usa 3000 por defecto

app.listen(PORT, () => {                                        // Inicia el servidor
    console.log(`Servidor encendido en el puerto ${PORT}`);     // Muestra un mensaje en consola indicando que el servidor está activo
});
