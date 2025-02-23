import { db } from "@/lib/prisma";

export const getCategoriesByRestaurant = async (restaurantId: string) => {
    const categories = await db.menuCategory.findMany({
        where: {
            restaurantId
        },
        include: {
            products: true
        }
    });
    return categories;
}