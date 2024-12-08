import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getProducts, updateProductAvailability } from '../services/ProductService';
import ProductDetails from '../components/ProductDetails';
import { Product } from '../types';

// Loader que asegura un array como retorno
export async function loader() {
    const products = await getProducts();
    console.log(products);

    // Aseguramos que siempre retorna un array, incluso si la API falla
    return Array.isArray(products) ? products : [];
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    await updateProductAvailability(+data.id);
    return {};
  }
  

export default function Products() {
    const products = useLoaderData() as Product[];

    // Verifica si `products` es un array válido
    if (!Array.isArray(products)) {
        return <p>Ocurrió un error al cargar los productos.</p>;
    }

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-4xl font-black text-slate-500'>
                    Productos
                </h2>
                <Link
                    to="productos/nuevo"
                    className='rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500'
                >
                    Agregar Producto
                </Link>
            </div>
            <div className='p-2'>
                <table className='w-full mt-5 table-auto'>
                    <thead className='bg-slate-800 text-white'>
                        <tr>
                            <th className='p-2'>Producto</th>
                            <th className='p-2'>Precio</th>
                            <th className='p-2'>Disponibilidad</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductDetails
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center p-4'>
                                    No hay productos disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
