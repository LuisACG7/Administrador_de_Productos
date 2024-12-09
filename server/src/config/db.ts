// Importar la clase Sequelize desde sequelize-typescript (ORM para base de datos).
import { Sequelize } from "sequelize-typescript"

// Importar dotenv para cargar variables de entorno desde el archivo .env.
import dotenv from 'dotenv'

// Cargar las variables de entorno.
dotenv.config()

// --------------------------------------------------------------------------------------------------
// Variable: bd
// Descripción: Instancia de Sequelize que representa la conexión a la base de datos. Carga los
// modelos desde la carpeta ../models y desactiva el logging para que no imprima consultas en consola.
// --------------------------------------------------------------------------------------------------
const bd = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*'], // Cargar todos los modelos de la carpeta models.
    logging: false // Desactivar el log de consultas SQL.
})

// Exportar la instancia bd para ser usada en otras partes de la aplicación.
export default bd