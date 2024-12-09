// Importar la librería express (Framework para crear aplicaciones web en Node.js).
import express from 'express'

// Importar el paquete colors (sirve para colorear mensajes en la consola).
import colors from 'colors'

// Importar la librería cors (Manejo de CORS: Cross-Origin Resource Sharing).
import cors, { CorsOptions } from 'cors'

// Importar la librería morgan (Middleware para registrar peticiones HTTP en consola).
import morgan from 'morgan'

// Importar swaggerUI (Herramienta para generar interfaz web de documentación de la API).
import swaggerUI from 'swagger-ui-express'

// Importar la especificación y opciones de Swagger desde la configuración local.
import swaggerSpec, { swaggerUiOptions } from './config/swagger'

// Importar el enrutador principal (router) de la aplicación.
import enrutador from './router'

// Importar la instancia de la base de datos.
import bd from './config/db'


// --------------------------------------------------------------------------------------------------
// Función: conectar_bd
// Descripción: Se encarga de autenticar y sincronizar la conexión a la base de datos.
// --------------------------------------------------------------------------------------------------
export async function conectar_bd() {
    try {
        // Autenticar la conexión a la base de datos.
        await bd.authenticate()
        
        // Sincronizar los modelos con la base de datos.
        await bd.sync()
        
        //console.log(colors.blue.bold('Conectado a la BD.')) // Línea comentada.
        
    } catch(error) {
        // En caso de error, imprimir el error en color rojo.
        console.log(colors.red.bold('Hubo un error al conectar a la BD.'))
    }
}

// Llamar a la función para conectar a la base de datos.
conectar_bd()


// Crear una instancia del servidor express.
// --------------------------------------------------------------------------------------------------
// Variable: servidor
// Descripción: Contiene la instancia principal de la aplicación express.
// --------------------------------------------------------------------------------------------------
const servidor = express()


// Configurar opciones de CORS.
// --------------------------------------------------------------------------------------------------
// Variable: opciones_cors
// Descripción: Define las opciones para el middleware de cors, indicando desde qué orígenes se
// permiten las peticiones. Si no existe el origin o no coincide con la URL del frontend especificada 
// en las variables de entorno, se permitirá el acceso para evitar el error de CORS.
// --------------------------------------------------------------------------------------------------
const opciones_cors : CorsOptions = {
    origin: function(origin, callback) {
        // Si no hay origin (por ejemplo, peticiones desde el mismo servidor) o coincide con FRONTEND_URL:
        if(!origin || origin === process.env.FRONTEND_URL) {
            callback(null, true) // Permitir el acceso.
        } else {
            // Si el origen no coincide, en lugar de arrojar error, podemos simplemente permitir.
            // Si se quiere restringir a un solo dominio, se puede volver a poner el callback con error.
            callback(null, true) // Permitir acceso a cualquier otro origen para evitar el error.
        }
    }
}

// Usar el middleware cors con las opciones definidas.
servidor.use(cors(opciones_cors))

// Middleware para leer datos JSON desde peticiones entrantes.
// --------------------------------------------------------------------------------------------------
// Método: servidor.use(express.json())
// Descripción: Permite que las peticiones con cuerpo JSON sean parseadas automáticamente.
// --------------------------------------------------------------------------------------------------
servidor.use(express.json())

// Usar morgan para registrar las solicitudes HTTP en la consola.
// --------------------------------------------------------------------------------------------------
// Método: servidor.use(morgan('dev'))
// Descripción: 'dev' es un formato predefinido de morgan que muestra detalles breves de la petición.
// --------------------------------------------------------------------------------------------------
servidor.use(morgan('dev'))

// Usar el enrutador principal para las rutas /api/products
// --------------------------------------------------------------------------------------------------
// Método: servidor.use('/api/products', enrutador)
// Descripción: Todas las rutas definidas en el enrutador se van a servir bajo el path /api/products.
// --------------------------------------------------------------------------------------------------
servidor.use('/api/products', enrutador)

// Configurar documentación con Swagger
// --------------------------------------------------------------------------------------------------
// Método: servidor.use('/docs', swaggerUI.serve, swaggerUI.setup(...))
// Descripción: Sirve la interfaz interactiva de Swagger UI en la ruta /docs, mostrando la 
// documentación de la API definida en swaggerSpec.
// --------------------------------------------------------------------------------------------------
servidor.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))

// Exportar el servidor para que pueda ser utilizado por otros archivos, por ejemplo, index.js.
// --------------------------------------------------------------------------------------------------
// Export: servidor
// Descripción: Exporta la instancia del servidor express configurado.
// --------------------------------------------------------------------------------------------------
export default servidor