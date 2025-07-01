import {useCallback, useMemo, useRef, useState} from "react";
import {Textarea} from "@headlessui/react";
import {useForm} from "@inertiajs/react";

const ManageProduct = ({originalProduct}) => {
	const [activeTab, setActiveTab] = useState('general');
	const [images, setImages] = useState([]);
	const fileInputRef = useRef(null);
	const {data, setData, post, processing, errors} = useForm({...originalProduct});

	console.log(originalProduct);

	const handleChange = useCallback((e) => {
		setData(e.target.name, e.target.value);
	}, [data]);

	const handleSave = useCallback((e) => {
		e.preventDefault();
		post('/backend/products');

	}, [data, images]);

	const handleCancel = useCallback(() => {
		window.history.back();
	}, []);


	const handleImageUpload = useCallback((e) => {
		const files = e.target.files;
		if (files) {
			setImages([...images, ...Array.from(files)]);
		}

		// Reset value so we can reupload the same image.
		e.target.value = null;
	}, [images]);

	const handleRemoveImage = useCallback((index) => {
		setImages(prev => prev.filter((_, i) => i !== index));
	}, [images]);

	const RenderGeneralTab = useCallback(() => (
		<>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
				<input
					type="text"
					name="name"
					value={data.name}
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
					value={data.description}
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
					value={data.status}
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
						value={data.price}
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
						value={data.tax}
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
						value={data.discount}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="0.00"
						step="0.01"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Discount type</label>
					<select
						name="discount_type"
						value={data.discount_type}
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
						value={data.stock}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="0.00"
						step="0.01"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
					<input
						type="text"
						name="sku"
						value={data.sku}
						onChange={handleChange}
						className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						placeholder="SKU"
					/>
				</div>
			</div>
		</>
	), [data]);

	const RenderImageTab = useCallback(() => {
		return (
		<>
			<div
				className="relative flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
				onClick={() => fileInputRef.current?.click()}
			>
				<div className="text-center">
					<svg
						className="mx-auto h-10 w-10 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 48 48"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M8 38h32M8 10h32M8 24h32"
						/>
					</svg>
					<p className="mt-2 text-sm text-gray-600">Click here to upload images</p>
				</div>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple
					onChange={handleImageUpload}
					className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
				/>
			</div>

			{/* Image preview grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
				{images.map((image, index) => (
					<div key={index}
						 className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm">
						<img
							src={typeof image === 'string' ? image : URL.createObjectURL(image)}
							alt={`Uploaded ${index}`}
							className="w-full h-32 object-contain"

						/>
						<button
							type="button"
							onClick={() => handleRemoveImage(index)}
							className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 hover:bg-red-500 hover:text-white transition-all"
						>
							✕
						</button>
					</div>
				))}
			</div>
		</>
		);
}, [images, fileInputRef]);


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
						disabled={processing}
					>
						Save
					</button>
				</div>
			</form>
		)
	}, [data, activeTab, RenderGeneralTab, RenderImageTab, processing]);
};

export default ManageProduct;
