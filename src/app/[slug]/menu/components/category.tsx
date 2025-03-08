"use client"

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { CartContext } from "../context/cart";
import CartSheet from "./cart-sheet";
import Products from "./products";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include : { products: true}
            }
        }
    }>
}

type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
    include: { products: true }
}>

const RestaurantCategories = ({restaurant}: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);
    const handleCategoryChange = (category: MenuCategoryWithProducts) => {
        setSelectedCategory(category);
    }
    const getCategoryVariants = (category: MenuCategoryWithProducts) => {
        return selectedCategory.id === category.id ? "default" : "secondary"
    }
    const { products, total, totalQuantity, toggleCart} = useContext(CartContext)
    
    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
            <div className="p-5">
                <div className="flex items-center gap-3">
                    <Image 
                        src={restaurant?.avatarImageUrl} 
                        alt={restaurant.name} 
                        width={45} 
                        height={45} 
                    />
                    <h2 className="text-lg font-semibold"></h2>
                    <p className="text-xs opacity-55">{restaurant.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
                    <ClockIcon size={12} />
                    <p>Aberto!</p>
                </div>
            </div>
            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 px-4 pt-0">
                    {restaurant.menuCategories.map(category => {
                        return <Button 
                            key={category.id} 
                            variant={getCategoryVariants(category)}
                            size="sm"
                            className="rounded-full"
                            onClick={() => handleCategoryChange(category)}
                            >
                                {category.name}
                            </Button>
                    })}
                </div>
                <ScrollBar orientation="horizontal"/>                
            </ScrollArea>
            <h3 className="px-5 font-semibold pt-2">{selectedCategory.name}</h3>
            <Products products={selectedCategory.products}/>
            {products.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-between px-5 py-3 bg-white border-t border-gray-200">
                    <div>
                        <p className="text-xs text-muted-foregro">Total dos pedidos</p>
                        <p className="text-sm font-semibold">
                            {formatCurrency(total)}
                            <span className="text-xs font-normal text-muted-foreground">
                                / {totalQuantity} {totalQuantity > 1 ? "itens": "item"}
                            </span>
                        </p>
                    </div>
                    <Button 
                        onClick={toggleCart}
                    >
                        Ver sacola
                    </Button>
                    <CartSheet />
                </div> 
            )}
        </div>
     );
}
 
export default RestaurantCategories;