import { Link } from 'react-router-dom'

export default function Products() {
    return(
        <div className='flex justify-between'>
            <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
            <Link
                to="productos/nuevo"
                className='rounded-md bg-blue-500 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-600'
            >
                Agregar Producto
            </Link>
        </div>
    )
}