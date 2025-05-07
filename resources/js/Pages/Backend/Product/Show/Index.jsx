import {useCallback, useMemo, useState} from "react";
import {Head, Link} from "@inertiajs/react";
import ManageProduct from "@/Components/Forms/ManageProduct.jsx";

const Index = ({ product: originalProduct }) => {
    return useMemo(() => (
        <div className={'flex-1 flex flex-col'}>
            <Head title="Products" />

            <div className="py-12 flex flex-1">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 flex flex-1">
                    <div className="bg-white p-8 rounded-xl shadow border border-gray-200 flex flex-1 flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h2>
                        <ManageProduct originalProduct={originalProduct} />
                    </div>
                </div>
            </div>
        </div>
    ), []);
}

export default Index;
