import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/category";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethod = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}
const RestaurantMenuPage = async ({params, searchParams}: RestaurantMenuPageProps) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;
    const restaurant = await getRestaurantBySlug(slug)

    if (!isConsumptionMethod(consumptionMethod) || !restaurant) {
        return notFound();
    }

    return ( 
        <div>
            <RestaurantHeader restaurant={restaurant}/>
            <RestaurantCategories restaurant={restaurant}/>
        </div>
     );
}
 
export default RestaurantMenuPage;