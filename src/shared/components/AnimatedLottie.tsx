import React, { memo } from 'react';
import Lottie from "lottie-react";
import { motion } from 'framer-motion';

export const AnimatedLottie = memo(({ animationData, className, layoutId }) => {
    return (
        <motion.div
            layoutId={layoutId}
            className={className}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.2
            }}
        >
            <Lottie
                animationData={animationData}
                loop={true}
                cacheInstance={true}
                rendererSettings={{
                    progressiveLoad: true,
                    hideOnTransparent: true,
                }}
                className={className}
            />
        </motion.div>
    );
});

AnimatedLottie.displayName = 'AnimatedLottie';