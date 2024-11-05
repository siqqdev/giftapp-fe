import React, {useCallback, useRef, useEffect, memo} from 'react';
import {AnimationNameType} from "@/shared/components/AnimatedLottie.tsx";
import { useAppDispatch } from "@/store/hooks.ts";
import { setTabBarVisibility } from "@/store/slices/tabBarSlice.ts";
import {Background} from "@/pages/store/components/giftCard/BackGround.tsx";
import {GiftContent} from "@/pages/store/components/giftCard/GiftContent.tsx";

interface Props {
    id: number;
    animationName: AnimationNameType;
    color: 'gold' | 'red' | 'green' | 'blue';
    name: string;
    price: number;
    currency: 'TON' | 'USDT' | 'ETH';
    amount: number;
    onSelect: (gift: Omit<Props, 'onSelect'>) => void;
}

const GiftCard = (props: Props) => {
    const {
        id,
        animationName,
        color,
        name,
        price,
        currency,
        amount,
        onSelect
    } = props;

    const dispatch = useAppDispatch();
    const cardRef = useRef<HTMLDivElement | null>(null);
    const rectRef = useRef<DOMRect | null>(null);

    useEffect(() => {
        const updateRect = () => {
            if (cardRef.current) {
                if ("getBoundingClientRect" in cardRef.current) {
                    rectRef.current = cardRef.current.getBoundingClientRect();
                }
            }
        };

        updateRect();
        const resizeObserver = new ResizeObserver(updateRect);

        if (cardRef.current) {
            resizeObserver.observe(cardRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (!rectRef.current) return;

        dispatch(setTabBarVisibility(false));
        onSelect({
            id,
            animationName,
            color,
            name,
            price,
            currency,
            amount,
            rect: rectRef.current
        });
    }, [id, animationName, color, name, price, currency, amount, dispatch, onSelect]);

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            className="relative w-full overflow-hidden rounded-2xl py-8 cursor-pointer"
        >
            <div className="absolute top-4 right-4 text-black opacity-50 text-sm z-10">
                4 of 500
            </div>
            <Background color={color}/>
            <GiftContent
                animationName={animationName}
                name={name}
                price={price}
                currency={currency}
            />
        </div>
    );
};

export default React.memo(GiftCard);