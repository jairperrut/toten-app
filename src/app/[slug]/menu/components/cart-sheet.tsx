import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../context/cart";

const CartSheet = () => {
    const {isOpen, toggleCart, products } = useContext(CartContext)

    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                {products.map(p => (
                    <h1 key={p.id}>{p.name} - {p.quantity}</h1>
                ))}
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;