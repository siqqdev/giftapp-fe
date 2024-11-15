import React, {useCallback, useRef, useEffect} from 'react';
import { useAppDispatch } from "@/store/hooks.ts";
import { setTabBarVisibility } from "@/store/slices/tabBarSlice.ts";
import {GiftContent} from "@/pages/store/components/giftCard/GiftContent.tsx";
import {IGift} from "@/inerfaces/interfaces.ts";
import {Background} from "@/pages/store/components/giftCard/BackGround.tsx";
import {useTranslation} from "react-i18next";

interface props {
    gift: IGift
    onSelect: ({gift: IGift, rect: DOMRect}) => void;
}

const GiftCard = ({gift, onSelect}: props) => {
    const {t} = useTranslation()
    console.log('Render Gift Card with GiftContent inside', Date.now())
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
            resizeObserver.observe(cardRef.current as Element);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const handleClick = useCallback((e: React.MouseEvent) => {
        const soldOut = gift.soldAmount === gift.totalAmount;
        if (soldOut) return
        e.stopPropagation();
        if (!rectRef.current) return;

        dispatch(setTabBarVisibility(false));
        onSelect({
            gift,
            rect: rectRef.current
        });
    }, [dispatch, onSelect]);

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            className="relative w-full overflow-hidden rounded-2xl py-8 cursor-pointer"
        >
            <div className="absolute top-4 right-4 text-black opacity-50 text-sm z-10 dark:text-white">
                {gift.soldAmount} {t('of')} {gift.totalAmount}
            </div>
            <Background animationName={gift.name}/>
            <GiftContent
                soldOut={gift.soldAmount === gift.totalAmount}
                name={gift.name}
                price={gift.price}
                currency={gift.asset}
            />
        </div>
    );
};

export default React.memo(GiftCard);