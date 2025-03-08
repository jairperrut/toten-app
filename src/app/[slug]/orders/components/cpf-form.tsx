"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod";

import { isValidCPF, trimCPF } from "@/app/helpers/cpf";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    cpf: z.string().nonempty({
        message: "O CPF é obrigatório"
    }).refine(isValidCPF, {
        message: "CPF inválido"
    }),
})

type FormSchema = z.infer<typeof formSchema>

const CPFForm = () => {
    const router = useRouter()
    const pathname = usePathname()
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: ""
        },
        shouldUnregister: true
    })

    const onSubmit = (data: FormSchema) => {
        router.push(`${pathname}?cpf=${trimCPF(data.cpf)}`)
    }

    const handleCancel = () => {
        router.back()
    }
    return ( 
        <Drawer open>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Visualizar Pedidos</DrawerTitle>
                    <DrawerDescription>Insira seu CPF abaixo para visualizar os pedidos</DrawerDescription>
                </DrawerHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField 
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="px-4">
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
                                variant="destructive"
                                className="w-full rounded-full"
                                type="submit">
                                    Confirmar
                            </Button>
                            <DrawerClose asChild>
                                <Button 
                                    onClick={handleCancel}
                                    className="w-full rounded-full" 
                                    variant="outline">
                                        Cancelar
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form> 
            </DrawerContent>
        </Drawer>
     );
}
 
export default CPFForm;