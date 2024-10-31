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
                stiffness: 200,
                damping: 25,
                duration: 0.4,
                ease: "easeInOut"
            }}
        >
            <Lottie
                animationData={animationData}
                loop={true}
                cacheInstance={true}
                rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: true
                }}
                className={className}
            />
        </motion.div>
    );
});

AnimatedLottie.displayName = 'AnimatedLottie';