import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({params}: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await getRestaurantBySlug(slug);
    if (!restaurant) {
        return notFound();
    }
    return ( <div className="h-screen flex flex-col items-center justify-center px-6 pt-24">
        <div className="flex flex-col items-center gap-2">
            <Image 
                src={restaurant?.avatarImageUrl} 
                alt={restaurant?.name}
                width={82} 
                height={82} 
            />
            <h2 className="font-semibold">{restaurant?.name}</h2>
        </div>
        <div className="pt-24 text-center space-y">
            <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
            <p className="text-gray-500">
                Aqui você encontra as melhores opções de refeições para o seu dia a dia.
            </p>
        </div>
        <div className="pt-14 gap-4 grid grid-cols-2">
            <ConsumptionMethodOption 
                slug={slug}
                option="DINE_IN"
                buttonText="Para comer aqui" 
                imageUrl="/dine_in.png" 
                imageAlt="Para comer aqui" 
            />
            <ConsumptionMethodOption
                slug={slug} 
                option="TAKEAWAY"
                buttonText="Para levar" 
                imageUrl="/takeaway.png" 
                imageAlt="Para levar" 
            />
        </div>
    </div> );
}
 
export default RestaurantPage;