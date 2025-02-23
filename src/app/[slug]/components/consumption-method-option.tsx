import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumptionMethodOptionProps {
    slug: string;
    imageUrl: string;
    imageAlt: string;
    buttonText: string;
    option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({ imageUrl, imageAlt, buttonText, option, slug }: ConsumptionMethodOptionProps) => {
    return ( 
        <Card>
            <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
                <CardContent className="flex flex-col items-center gap-8 py-8">
                    <div className="relative h-[80px] w-[80px]">
                        <Image src={imageUrl} alt={imageAlt} fill className="object-contain" />
                    </div>
                    <Button variant="secondary" className="rounded-full">
                            {buttonText}
                    </Button>
                </CardContent>
            </Link>
        </Card>
     );
}
 
export default ConsumptionMethodOption;