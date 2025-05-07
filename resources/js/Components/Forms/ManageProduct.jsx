import {useCallback, useMemo, useState} from "react";
import {Textarea} from "@headlessui/react";

const ManageProduct = ({originalProduct}) => {
	const [product, setProduct] = useState(originalProduct);
	const [activeTab, setActiveTab] = useState('general');

	const handleChange = useCallback((e) => {
		setProduct(prev => {
			return {...prev, [e.target.name]: e.target.value};
		});
	}, [product]);

	const handleSave = useCallback((e) => {
		e.preventDefault();
		// API call or form submit logic goes here
	}, []);

	const handleCancel = useCallback(() => {
		window.history.back();
	}, []);

	const RenderGeneralTab = useCallback(() => (
		<>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
				<input
					type="text"
					name="name"
					value={product.name}
					onChange={handleChange}
					className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Enter product name"
					required
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
				<Textarea
					name="description"
					value={product.description}
					onChange={handleChange}
					className="w-full min-h-42 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Enter product name"
					required
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
				<select
					name="status"
					value={product.status}
					onChange={handleChange}
					className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
				>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
				</select>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
					<input
						type="number"
						name="price"
						value={product.price}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="0.00"
						step="0.01"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Tax</label>
					<input
						type="number"
						name="tax"
						value={product.tax}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="Tax"
						required
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
					<input
						type="number"
						name="discount"
						value={product.discount}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="0.00"
						step="0.01"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Discount type</label>
					<select
						name="discount_type"
						value={product.discount_type}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					>
						<option value="fixed">Fixed</option>
						<option value="percentage">Percentage</option>
					</select>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
					<input
						type="number"
						name="stock"
						value={product.stock}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="0.00"
						step="0.01"
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
					<input
						type="text"
						name="sku"
						value={product.sku}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="SKU"
					/>
				</div>
			</div>
		</>
	), [product]);

	const RenderImageTab = useCallback(() => (
		<>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
				<input
					type="text"
					name="name"
					value={product.name}
					onChange={handleChange}
					className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					placeholder="Enter product name"
					required
				/>
			</div>
		</>
	), [product]);


	return useMemo(() => {
		return (
			<form onSubmit={handleSave} className="flex flex-1 flex-col gap-3 justify-start">
				<div className="border-b border-gray-200">
					<nav className="flex space-x-6" aria-label="Tabs">
						<button
							onClick={() => setActiveTab('general')}
							className={`pb-2 border-b-2 font-medium text-sm ${
								activeTab === 'general'
									? 'border-indigo-500 text-indigo-600'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
							}`}>
							General
						</button>
						<button
							onClick={() => setActiveTab('images')}
							className={`pb-2 border-b-2 font-medium text-sm ${
								activeTab === 'images'
									? 'border-indigo-500 text-indigo-600'
									: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
							}`}>
							Images
						</button>
					</nav>
				</div>
				<div className={'flex flex-1 flex-col'}>
					{activeTab === 'general' && RenderGeneralTab()}
					{activeTab === 'images' && RenderImageTab()}
				</div>
				<div className="flex gap-4 justify-end">
					<button
						type="button"
						onClick={handleCancel}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
					>
						Save
					</button>
				</div>
			</form>
		)
	}, [product, activeTab]);
};

export default ManageProduct;
