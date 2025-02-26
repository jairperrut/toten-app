import { useContext, useState } from "react";

import { formatCurrency } from "@/app/helpers/format-currency";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";
import CartProdcutItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
    const {isOpen, toggleCart, products, total } = useContext(CartContext)
    const [finishOrderDialogOpen, setFinishOrderDialogOpen] = useState(false);
    
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent className="w-[80%]">
                <SheetHeader>
                    <SheetTitle className="text-left">Sacola</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="py-5 flex flex-col h-full">
                    <div className="flex-auto">
                        {products.map(p => (
                            <CartProdcutItem key={p.id} product={p} />
                        ))}
                    </div>
                    <Card className="mb-6">
                        <CardContent className="p-5">
                            <div className="flex justify-between">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Button className="w-full rounded-full" onClick={()=>setFinishOrderDialogOpen(true)}>Finalizar pedido</Button>
                    <FinishOrderDialog 
                        open={finishOrderDialogOpen} 
                        onOpenChange={setFinishOrderDialogOpen}
                    />
                </div>
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;