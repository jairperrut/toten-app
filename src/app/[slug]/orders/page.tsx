import { isValidCPF, trimCPF } from "@/app/helpers/cpf";
import { db } from "@/lib/prisma";

import CPFForm from "./components/cpf-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
    searchParams: Promise<{ cpf: string }>
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
    const { cpf } = await searchParams;

    if (!cpf || !isValidCPF(cpf)) {
        return <CPFForm />
    }

    const orders = await db.order.findMany({
        where: {
            customerCPF: trimCPF(cpf)
        },
        orderBy : {
            createdAt: 'desc'
        },
        include:{
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            },
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return ( 
        <OrderList orders={orders}/>
    );
}
 
export default OrdersPage;

