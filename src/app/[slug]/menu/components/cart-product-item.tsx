import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";

import { CartContext, CartProduct} from "../context/cart";

interface CartProdcutItemProps {
    product: CartProduct;
}

const CartProdcutItem = ({product}: CartProdcutItemProps) => {
    const {increaseProductQuantity, decreaseProductQuantity, removeProduct } = useContext(CartContext)
    
    return (
            <div className="flex items-cent justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
                        <Image src={product.imageUrl} alt={product.name} fill />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs  max-w-[90%] truncate text-ellipsis">{product.name}</p>
                        <p className="text-sm">{formatCurrency(product.price)}</p>
                        <div className="flex items-center gap-1">
                            <Button 
                                className="w-7 h-7 rounded-lg" 
                                variant="outline"
                                onClick={() => decreaseProductQuantity(product.id)}    
                            >
                                <ChevronLeftIcon />
                            </Button>
                            <p className="text-xs w-7 text-center">{product.quantity}</p>
                            <Button 
                                className="w-7 h-7 rounded-lg" 
                                variant="destructive"
                                onClick={() => increaseProductQuantity(product.id)}    
                            >
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                </div>
                <Button 
                    className="w-7 h-7 rounded-lg" 
                    variant="outline"
                    onClick={() => removeProduct(product.id)}
                >
                    <TrashIcon />
                </Button>
            </div>
     );
}
 
export default CartProdcutItem;