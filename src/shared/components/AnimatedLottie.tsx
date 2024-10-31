import React, { memo } from 'react';
import Lottie from "lottie-react";
import {AnimationName, getAnimation} from "@/store/lottieStore.ts";

interface AnimatedLottieProps {
    name: AnimationName;
    className?: string;
}

export const AnimatedLottie = memo(({ name, className }: AnimatedLottieProps) => {
    const animationData = getAnimation(name);

    const rendererSettings = {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: false,
        hideOnTransparent: true,
        clearCanvas: false,
    };

    return (
        <div className={className} style={{ willChange: 'transform' }}>
            <Lottie
                animationData={animationData}
                loop={true}
                cacheInstance={true}
                rendererSettings={rendererSettings}
                className={className}
            />
        </div>
    );
});

AnimatedLottie.displayName = 'AnimatedLottie';