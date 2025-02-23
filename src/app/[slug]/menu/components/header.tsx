"use client"

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
    restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>
}

const RestaurantHeader = ({restaurant}: RestaurantHeaderProps) => {
    const { back } = useRouter();
    return ( 
        <div className="relative h-[200px] w-full">
            <Button
                onClick={back} 
                variant="secondary" 
                size="icon" 
                className="absolute top-4 left-4 rounded-full z-50"
            >
                <ChevronLeftIcon />
            </Button>
            <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full z-50">
                <ScrollTextIcon />
            </Button>
            <Image src={restaurant.coverImageUrl} fill alt={restaurant.name}/>
        </div>
     );
}
 
export default RestaurantHeader;