import React, { memo, useRef, useEffect } from 'react';
import Lottie from "lottie-react";

import effectGiftPurchased from '@/assets/animations/effect-gift-purchased.json';
import giftBlueStar from '@/assets/animations/gift-blue-star.json';
import giftDeliciousCake from '@/assets/animations/gift-delicious-cake.json';
import giftGreenStar from '@/assets/animations/gift-green-star.json';
import giftRedStar from '@/assets/animations/gift-red-star.json';
import emojiBalloons from '@/assets/animations/emoji-balloons.json';

const ANIMATIONS = {
    'effect-gift-purchased': effectGiftPurchased,
    'gift-blue-star': giftBlueStar,
    'gift-delicious-cake': giftDeliciousCake,
    'gift-green-star': giftGreenStar,
    'gift-red-star': giftRedStar,
    'emoji-balloons': emojiBalloons,
} as const;

export type AnimationNameType = keyof typeof ANIMATIONS;

interface LottieOptions {
    animationData: any;
    loop?: boolean;
    autoplay?: boolean;
    renderer?: 'svg' | 'canvas';
    rendererSettings?: {
        clearCanvas?: boolean;
        progressiveLoad?: boolean;
        hideOnTransparent?: boolean;
        preserveAspectRatio?: string;
        context?: {
            alpha?: boolean;
            willReadFrequently?: boolean;
        };
    };
    [key: string]: any;
}

interface AnimatedLottieProps extends Omit<LottieOptions, 'animationData'> {
    animationName: AnimationNameType;
    className?: string;
}

export const AnimatedLottie = memo(({ animationName, className, ...props }: AnimatedLottieProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    useEffect(() => {
        if (isIOS && containerRef.current) {
            if ("style" in containerRef.current) {
                containerRef.current.style.transform = 'translateZ(0)';
            }
            if ("style" in containerRef.current) {
                containerRef.current.style.backfaceVisibility = 'hidden';
            }
        }
    }, [isIOS]);

    const lottieOptions: LottieOptions = {
        animationData: ANIMATIONS[animationName],
        loop: true,
        renderer: 'canvas',
        rendererSettings: {
            clearCanvas: true,
            progressiveLoad: false,
            hideOnTransparent: true,
            preserveAspectRatio: 'xMidYMid slice',
            context: {
                alpha: true,
                willReadFrequently: true
            }
        },
        ...props
    };

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Lottie
                {...lottieOptions}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
});

AnimatedLottie.displayName = 'AnimatedLottie';