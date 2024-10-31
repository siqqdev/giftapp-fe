import React, { memo, useMemo } from 'react';
import Lottie from "lottie-react";

export const AnimatedLottie = memo(({ animationData, className }) => {
    const rendererSettings = useMemo(() => ({
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true,
        hideOnTransparent: true,
        clearCanvas: false,
    }), []);

    const lottieOptions = useMemo(() => ({
        animationData,
        loop: true,
        cacheInstance: true,
        rendererSettings,
        className,
    }), [animationData, className, rendererSettings]);

    return (
        <div className={className} style={{ willChange: 'transform' }}>
            <Lottie {...lottieOptions} />
        </div>
    );
});

AnimatedLottie.displayName = 'AnimatedLottie';