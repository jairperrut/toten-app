import { notFound } from "next/navigation";

import { getProductById } from "@/data/get-product-by-id";

import ProductDetail from "./components/product-detail";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
    params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { slug, productId } = await params;
    const product = await getProductById(productId);
    
    if (!product) notFound();

    if (product.restaurant.slug.toUpperCase() != slug.toUpperCase()) notFound();

    return ( 
        <div className="flex h-full flex-col">
            <ProductHeader product={product} />
            <ProductDetail product={product} />
        </div>
    );
}
 
export default ProductPage;
