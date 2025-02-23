import { notFound } from "next/navigation";

import { getProductById } from "@/data/get-product-by-id";

import ProductHeader from "./components/product-header";

interface ProductPageProps {
    params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { slug, productId } = await params;
    console.log(slug, productId);
    const product = await getProductById(productId);
    
    if (!product){
        return notFound();
    }

    return ( 
        <>
            <ProductHeader product={product}/>
            <h1>
                {slug} - {productId}
            </h1>
        </>
    );
}
 
export default ProductPage;
