import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getProducts, updateProductAvailability } from '../services/ProductService';
import ProductDetails from '../components/ProductDetails';
import { Product } from '../types';

export async function loader() {
    // Garantiza que siempre devuelva un array, incluso si la API falla
    const products = await getProducts();
    return Array.isArray(products) ? products : [];
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    if (data.id) {
        await updateProductAvailability(+data.id);
    }
    return {};
}

export default function Products() {
    const products = useLoaderData() as Product[];

    if (!Array.isArray(products)) {
        return (
            <div className="text-center my-4 text-red-600">
                Error al cargar los productos. Intente recargar la página.
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                    to="productos/nuevo"
                    className="rounded-md bg-blue-500 p-3 text-sm font-bold text-white shadow-sm hover:bg-blue-600"
                >
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductDetails key={product.id} product={product} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center">
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
