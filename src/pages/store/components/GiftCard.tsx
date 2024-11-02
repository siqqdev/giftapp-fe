import React, {useCallback, useRef, useEffect, memo} from 'react';
import classNames from 'classnames';
import TgPattern from '@/assets/tg-pattern.png';
import Button from "@/shared/ui/Button.tsx";
import { TransparentCurrencyIcon, gradientClassNames } from "@/shared/consts.ts";
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";
import { useAppDispatch } from "@/store/hooks.ts";
import { setTabBarVisibility } from "@/store/slices/tabBarSlice.ts";

interface Props {
    id: number;
    animationData: string;
    color: 'gold' | 'red' | 'green' | 'blue';
    name: string;
    price: number;
    currency: 'TON' | 'USDT' | 'ETH';
    amount: number;
    onSelect: (gift: Omit<Props, 'onSelect'>) => void;
}

const AnimationContainer = memo(({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
            contain: 'paint size layout',
            '-webkit-mask-image': '-webkit-radial-gradient(white, black)'
        }}
    >
        {children}
    </div>
));

// Выносим статичные компоненты в отдельные мемоизированные компоненты
const Background = React.memo(({ color }: { color: Props['color'] }) => (
    <div className="absolute inset-0">
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${TgPattern})` }}
        />
        <div className={classNames('absolute inset-0 bg-opacity-10', gradientClassNames[color])} />
    </div>
));

const GiftContent = React.memo(({
                                    animationData,
                                    name,
                                    price,
                                    currency
                                }: Pick<Props, 'animationData' | 'name' | 'price' | 'currency'>) => {
    const Icon = TransparentCurrencyIcon[currency];

    return (
        <div className="relative flex flex-col gap-3 justify-center items-center w-full rounded-xl">
            <div className='w-40 h-40'>
                <AnimatedLottie
                    animationData={animationData}
                    className='w-full h-full'
                />
            </div>
            <p className="font-bold text-center text-lg">{name}</p>
            <Button>
                <Icon className="w-4 h-4" />
                {price} {currency}
            </Button>
        </div>
    );
});

const GiftCard = (props: Props) => {
    const {
        id,
        animationData,
        color,
        name,
        price,
        currency,
        amount,
        onSelect
    } = props;

    const dispatch = useAppDispatch();
    const cardRef = useRef<HTMLDivElement>(null);
    const rectRef = useRef<DOMRect | null>(null);

    useEffect(() => {
        const updateRect = () => {
            if (cardRef.current) {
                rectRef.current = cardRef.current.getBoundingClientRect();
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
            animationData,
            color,
            name,
            price,
            currency,
            amount,
            rect: rectRef.current
        });
    }, [id, animationData, color, name, price, currency, amount, dispatch, onSelect]);

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            className="relative w-full overflow-hidden rounded-2xl py-8 cursor-pointer"
        >
            <Background color={color} />
            <GiftContent
                animationData={animationData}
                name={name}
                price={price}
                currency={currency}
            />
        </div>
    );
};

export default React.memo(GiftCard);