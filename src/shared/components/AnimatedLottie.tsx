import React, {memo, useRef, useEffect, useState} from 'react';
import Lottie, {LottieRefCurrentProps} from "lottie-react";

const ANIMATIONS = {
    'effect-gift-purchased': () => import('@/assets/animations/effect-gift-purchased.json'),
    'Blue Star': () => import('@/assets/animations/gift-blue-star.json'),
    'Delicious Cake': () => import('@/assets/animations/gift-delicious-cake.json'),
    'Green Star': () => import('@/assets/animations/gift-green-star.json'),
    'Red Star': () => import('@/assets/animations/gift-red-star.json'),
    'emoji-balloons': () => import('@/assets/animations/emoji-balloons.json'),
} as const;

const animationCache = new Map<string, any>();

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
    const lottieRef = useRef<LottieRefCurrentProps | null>(null);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [playDirection, setPlayDirection] = useState<1 | -1>(1);
    const [animationData, setAnimationData] = useState<any>(null);
    const isStarAnimation = animationName.includes('Star');

    useEffect(() => {
        let isMounted = true;

        const loadAnimation = async () => {
            try {
                if (animationCache.has(animationName)) {
                    if (isMounted) {
                        setAnimationData(animationCache.get(animationName));
                    }
                    return;
                }

                const module = await ANIMATIONS[animationName]();
                const data = module.default;

                animationCache.set(animationName, data);

                if (isMounted) {
                    setAnimationData(data);
                }
            } catch (error) {
                console.error('Failed to load animation:', error);
            }
        };

        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => loadAnimation());
        } else {
            loadAnimation();
        }

        return () => {
            isMounted = false;
        };
    }, [animationName]);

    useEffect(() => {
        if (isIOS && containerRef.current) {
            if ("style" in containerRef.current) {
                containerRef.current.style.transform = 'translateZ(0)';
                containerRef.current.style.backfaceVisibility = 'hidden';
            }
        }
    }, [isIOS]);

    const handleComplete = () => {
        if (!isStarAnimation || !lottieRef.current) return;

        setPlayDirection(prev => prev === 1 ? -1 : 1);

        if (lottieRef.current) {
            lottieRef.current.setDirection(playDirection);
            lottieRef.current.play();
        }
    };

    const lottieOptions: LottieOptions = {
        animationData,
        loop: !isStarAnimation,
        renderer: 'canvas',
        rendererSettings: {
            clearCanvas: true,
            progressiveLoad: true,
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
                lottieRef={lottieRef}
                onComplete={handleComplete}
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