import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedLottie } from "@/shared/components/AnimatedLottie.tsx";

interface GiftAnimationProps {
    animationData: string;
}

const GiftAnimation = ({ animationData }: GiftAnimationProps) => (
    <motion.div
        variants={{
            initial: { width: '9rem', height: '9rem', scale: 1 },
            animate: { width: '16rem', height: '16rem', scale: 1 },
            exit: { width: '9rem', height: '9rem', scale: 1 }
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="will-change-transform"
    >
        <AnimatedLottie
            animationData={animationData}
            className="w-full h-full"
        />
    </motion.div>
);

export default React.memo(GiftAnimation);