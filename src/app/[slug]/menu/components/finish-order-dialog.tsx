"use client";

import { zodResolver } from "@hookform/resolvers/zod"   
import { ConsumptionMethod } from "@prisma/client";
import { Loader2Icon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form"
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { z } from "zod"

import { isValidCPF } from "@/app/helpers/cpf";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrder } from "../actions/create-order";
import { CartContext } from "../context/cart";

const formSchema = z.object({
    name: z.string().nonempty({
        message: "O nome é obrigatório"
    }),
    cpf: z.string().nonempty({
        message: "O CPF é obrigatório"
    }).refine(isValidCPF, {
        message: "CPF inválido"
    }),
    
})

interface FinishOrderDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void   
}

type FormSchema = z.infer<typeof formSchema>

const FinishOrderDialog = ({open, onOpenChange}: FinishOrderDialogProps) => {
    const { slug } = useParams<{slug: string}>();
    const { products } = useContext(CartContext)
    const searchParam = useSearchParams()
    const [ isPending, startTransition ] = useTransition()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: ""
        },
        shouldUnregister: true
    })

    const onSubmit = async (data: FormSchema) => {
        try {
            startTransition(async () => {
                await createOrder({
                    customerName: data.name,
                    customerCPF: data.cpf,
                    products,
                    consumptionMethod: searchParam.get("consumptionMethod") as ConsumptionMethod,
                    restaurantSlug: slug
                })
                onOpenChange(false)
                toast.success("Pedido finalizado com sucesso")
            })
        } catch (error) {
            console.error(error)
        }
    }

    return ( 
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar Pedido</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o seu pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Seu nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite seu nome" {...field}></Input>
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Seu CPF</FormLabel>
                                    <FormControl>
                                        <PatternFormat 
                                            placeholder="Digite seu CPF" 
                                            format="###-###-###-##" 
                                            customInput={Input}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                            <DrawerFooter>
                                <Button
                                    disabled={isPending}
                                    variant="destructive"
                                    className="w-full rounded-full"
                                    type="submit">
                                        {isPending && <Loader2Icon className="animate-spin"/>}
                                        Finalizar
                                    </Button>
                                <DrawerClose asChild>
                                    <Button className="w-full rounded-full" variant="outline">Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
     );
}
 
export default FinishOrderDialog;