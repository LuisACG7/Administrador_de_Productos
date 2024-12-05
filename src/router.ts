import { Router} from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()
// Routing
router.get('/', getProducts)
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

router.post(
    '/',
    [
      // Validación
      body('name')
        .notEmpty().withMessage('El nombre del Producto no puede ir vacío'),
      body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacío')
        .custom((value) => value > 0).withMessage('Precio no válido'),
      handleInputErrors, // Middleware después de las validaciones
    ],
    createProduct // Controlador
  )

router.put('/', (req, res) => {
    res.json('Desde PUT')
})

router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router
