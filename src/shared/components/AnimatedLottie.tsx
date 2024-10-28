import React from 'react';
import Lottie from "lottie-react";
import { motion } from 'framer-motion';

const AnimatedLottie = ({ animationData, className, layoutId }) => {
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
            />
        </motion.div>
    );
};

export default AnimatedLottie;