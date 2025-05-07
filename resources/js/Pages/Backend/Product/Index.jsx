import { useMemo} from "react";
import {Head, Link} from "@inertiajs/react";
import { route } from 'ziggy-js';

const Index = ({ products }) => {
    return useMemo(() => {
        return (
            <div>
                <Head title="Products"/>

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full">Name</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="[&>tr:nth-child(even)]:bg-gray-50">
                                    {products?.map((product, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-full">{product.name}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-green-500 ${product.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{product.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('backend.products.show', {id: product.id})} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }, [products])
}

export default Index;
