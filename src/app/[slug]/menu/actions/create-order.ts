"use server"

import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { trimCPF } from "@/app/helpers/cpf";
import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";
import { db } from "@/lib/prisma";

interface CreateOrderInput {
    customerName: string;
    customerCPF: string;
    products: Array<{
        id: string;
        quantity: number;
    }>
    consumptionMethod: ConsumptionMethod;
    restaurantSlug: string;
}



export const createOrder = async (input: CreateOrderInput) => {
    const restaurant = await getRestaurantBySlug(input.restaurantSlug)

    if (!restaurant) {
        throw new Error("Restaurant not found")
    }

    const productsWIthPrice = await db.product.findMany({
        where: {
            id: {
                in: input.products.map(p => p.id)
            }
        }
    })

    const productsWhithPriceAndQuantity = input.products.map(p => ({
        productId: p.id,
        quantity: p.quantity,
        price: productsWIthPrice.find(pw => pw.id === p.id)!.price
    }))

    await db.order.create({
        data: {
            customerName: input.customerName,
            customerCPF: trimCPF(input.customerCPF),
            consumptionMethod: input.consumptionMethod,
            restaurantId: restaurant.id,
            status: "PENDING",
            orderProducts: {
                createMany: {
                    data: productsWhithPriceAndQuantity
                }
            },
            total: productsWhithPriceAndQuantity.reduce((acc, p) => acc + p.price * p.quantity, 0),
        }
    })
    redirect(`/${input.restaurantSlug}/orders?cpf=${input.customerCPF}`)
}