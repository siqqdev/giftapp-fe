import React, { memo, useRef, useEffect } from 'react';
import Lottie from "lottie-react";

interface AnimatedLottieProps {
    animationData: any;
    className?: string;
    [key: string]: any;
}

export const AnimatedLottie = memo(({ animationData, className, ...props }: AnimatedLottieProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    useEffect(() => {
        if (isIOS && containerRef.current) {
            containerRef.current.style.transform = 'translateZ(0)';
            containerRef.current.style.backfaceVisibility = 'hidden';
        }
    }, [isIOS]);

    const lottieOptions = {
        animationData,
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