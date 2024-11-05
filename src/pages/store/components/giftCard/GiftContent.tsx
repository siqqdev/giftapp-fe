import React from "react";
import {TransparentCurrencyIcon} from "@/shared/consts.ts";
import {AnimatedLottie, AnimationNameType} from "@/shared/components/AnimatedLottie.tsx";
import Button from "@/shared/ui/Button.tsx";
import {CurrencyType, SVGProps} from "@/inerfaces/interfaces.ts";

interface props {
    animationName: AnimationNameType;
    name: string;
    price: string;
    currency: CurrencyType
}

export const GiftContent = React.memo(({
                                           animationName,
                                           name,
                                           price,
                                           currency
                                       }: props) => {
    const Icon = TransparentCurrencyIcon[currency] as React.FC<SVGProps>;

    return (
        <div className="relative flex flex-col gap-3 justify-center items-center w-full rounded-xl">
            <div className='w-40 h-40'>
                <AnimatedLottie
                    animationName={animationName}
                    className='w-full h-full'
                />
            </div>
            <p className="font-bold text-center text-lg">{name}</p>
            <Button>
                <Icon className="w-4 h-4"/>
                {price} {currency}
            </Button>
        </div>
    );
});