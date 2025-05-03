import { useMemo} from "react";
import {Head} from "@inertiajs/react";

const Index = ({ products }) => {
    return useMemo(() => {
        return (
            <div>
                <Head title="Dashboard"/>

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                Products
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }, [products])
}

export default Index;
