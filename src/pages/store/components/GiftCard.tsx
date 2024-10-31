import React, { useCallback, useRef, useEffect } from 'react';
import classNames from 'classnames';
import TgPattern from '@/assets/tg-pattern.png';
import Button from "@/shared/ui/Button.tsx";
import { TransparentCurrencyIcon, gradientClassNames } from "@/shared/consts.ts";
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import { useAppDispatch } from "@/store/hooks.ts";
import { setTabBarVisibility } from "@/store/slices/tabBarSlice.ts";
import {IGift} from "@/inerfaces/interfaces.ts";

interface Props extends IGift {
    onSelect: (gift: Omit<Props, 'onSelect'>) => void;
}

const GiftCard = ({
                      id,
                      animationName, // Изменили тип на animationName
                      color,
                      name,
                      price,
                      currency,
                      amount,
                      onSelect
                  }: Props) => {
    const dispatch = useAppDispatch();
    const Icon = TransparentCurrencyIcon[currency];
    const cardRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    useEffect(() => {
        if (cardRef.current) {
            rectRef.current = cardRef.current.getBoundingClientRect();
        }

        const resizeObserver = new ResizeObserver(() => {
            if (cardRef.current) {
                rectRef.current = cardRef.current.getBoundingClientRect();
            }
        });

        if (cardRef.current) {
            resizeObserver.observe(cardRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();

        const rect = rectRef.current;
        if (!rect) return;

        dispatch(setTabBarVisibility(false));
        onSelect({
            id,
            animationName,
            color,
            name,
            price,
            currency,
            amount,
            rect
        });
    }, [id, animationName, color, name, price, currency, amount, dispatch, onSelect]);

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            className="relative w-full overflow-hidden rounded-2xl py-8 cursor-pointer will-change-transform"
            style={{
                WebkitBackfaceVisibility: 'hidden',
                WebkitPerspective: 1000,
                WebkitTransform: 'translateZ(0)',
                touchAction: 'manipulation'
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translateZ(0)',
                }}
            >
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
                    style={{
                        backgroundImage: `url(${TgPattern})`,
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitTransform: 'translateZ(0)',
                    }}
                />
                <div
                    className={classNames(
                        'absolute inset-0 bg-opacity-10',
                        gradientClassNames[color]
                    )}
                    style={{
                        WebkitBackfaceVisibility: 'hidden',
                        WebkitTransform: 'translateZ(0)',
                    }}
                />
            </div>

            <div
                className="relative flex flex-col gap-3 justify-center items-center w-full rounded-xl"
                style={{
                    WebkitBackfaceVisibility: 'hidden',
                    WebkitTransform: 'translateZ(0)',
                }}
            >
                <AnimatedLottie
                    name={animationName}
                    className="w-36 h-36"
                />
                <p className="font-bold text-center text-lg">{name}</p>
                <Button>
                    <Icon className="w-4 h-4" />
                    {price} {currency}
                </Button>
            </div>
        </div>
    );
};

export default React.memo(GiftCard);