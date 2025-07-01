import {useMemo} from "react";
import {Head, Link} from "@inertiajs/react";
import {route} from 'ziggy-js';

const Index = ({products}) => {
	const content = useMemo(() => {
		if (!products.length) {
			return (
				<span>There are no products yet. Add your first product by clicking the button above.</span>
			);
		}

		return (
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
							<Link href={route('backend.products.show', {id: product.id})}
								  className="text-indigo-600 hover:text-indigo-900">Edit</Link>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		);
	}, [products.length])


	return useMemo(() => {
		return (
			<div className="py-12">
				<Head title="Products"/>
				<div className="overflow-hidden rounded-xl shadow border border-gray-200 flex flex-1 flex-col">
					<div className="overflow-x-auto w-full p-8">
						<div className="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8 border-b">
							<div>
								<h1 className="text-2xl font-bold text-gray-900">Products</h1>
								<p className="mt-1 text-sm text-gray-500">Manage your store’s inventory.</p>
							</div>
							<div>
								<Link href={route('backend.products.create')}>
									<button
										type="button"
										className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
									>
										<svg
											className="h-4 w-4"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											viewBox="0 0 24 24"
										>
											<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
										</svg>
										Add Product
									</button>
								</Link>
							</div>
						</div>

						<div className="py-4">
							{content}
						</div>
					</div>
				</div>
			</div>
		)
	}, [products])
}

export default Index;
