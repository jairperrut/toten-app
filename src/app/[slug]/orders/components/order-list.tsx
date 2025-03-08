import { OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderListProps {
    orders: Array<Prisma.OrderGetPayload<{
        include: {
            restaurant: {
                select:{
                    name: true;
                    avatarImageUrl: true;
                }
            },
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>>;   
}

const OrderList = ({ orders }: OrderListProps) => {
    
    const getStatusLabel = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.CANCELLED:
                return 'Cancelado';
            case OrderStatus.FINISHED:
                return 'Finalizado';
            case OrderStatus.IN_PREPARATION:
                return 'Em preparo';
            case OrderStatus.PENDING:
                return 'Pendente';
            default:
                return '';
        }
    }

    return ( 
        <div className="space-y-6 p-6">
            <Button 
                size="icon"
                className="rounded-full" 
                variant="secondary"  
            >
                <ChevronLeftIcon />
            </Button>
            <div className="flex item-center gap-3">
                <ScrollTextIcon />
                <h2 className="text-lg font-semibol">Meus pedidos</h2>
            </div>
            {orders.map(order => (
                <Card key={order.id}>
                    <CardContent className="p-5 space-y-4">
                        <div className={`w-fit rounded-full px-2 py-1 text-xs font-semibold bg-gray-300 ${order.status === OrderStatus.FINISHED ? 'bg-green-400  text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {getStatusLabel(order.status)}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative w-5 h-5">
                                <Image
                                    src={order.restaurant.avatarImageUrl}
                                    alt={order.restaurant.name}
                                    className="rounded-lg"
                                    fill
                                />
                            </div>
                            <p className="text-sm font-semibold">
                                {order.restaurant.name}
                            </p>
                        </div>
                        <Separator />
                        <div className="space-y-">
                            {order.orderProducts.map(orderProduct => (
                                <div key={orderProduct.id} className="flex item-center gap-2">
                                    <div className="h-5 w-5 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-semibold">
                                        {orderProduct.quantity}
                                    </div>
                                    <p className="text-sm">
                                        {orderProduct.product.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
 
export default OrderList;