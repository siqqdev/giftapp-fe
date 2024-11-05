import Star from '@/assets/icons/star.svg?react'
import { useMemo } from "react";
import { motion } from 'framer-motion'

const Sparkles = () => {
    const sparklePositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 100; i++) {
            const angle = (Math.PI * 2 * i) / 60 + (Math.random() * 0.5 - 0.25);

            let distance;
            const isMoreHorizontal = Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle));

            if (isMoreHorizontal) {
                distance = 40 + Math.random() * 140;
            } else {
                distance = 20 + Math.random() * 80;
            }

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            const isLarge = Math.random() > 0.3;

            positions.push({
                x,
                y,
                initialX: 0,
                initialY: 0,
                scale: isLarge ? (Math.random() * 0.3 + 0.4) : (Math.random() * 0.15 + 0.15),
                delay: Math.random() * 0.8,
                duration: 1.2 + Math.random() * 0.6,
                repeatDelay: Math.random() * 1.5,
                color: Math.random() > 0.7 ? 'text-gold' : '#FECC13',
                size: isLarge ? 'w-6 h-6' : 'w-3 h-3'
            });
        }
        return positions;
    }, []);

    return (
        <div className="absolute inset-0">
            {sparklePositions.map((pos, index) => (
                <motion.div
                    key={index}
                    className="absolute left-1/2 top-1/2"
                    initial={{
                        opacity: 0,
                        scale: 0,
                        x: pos.initialX,
                        y: pos.initialY
                    }}
                    animate={{
                        opacity: [0, 1, 0.8, 0],
                        scale: [0, pos.scale, pos.scale * 0.9, 0],
                        x: [pos.initialX, pos.x],
                        y: [pos.initialY, pos.y]
                    }}
                    transition={{
                        duration: pos.duration,
                        delay: pos.delay,
                        repeat: Infinity,
                        repeatDelay: pos.repeatDelay,
                        ease: "easeOut"
                    }}
                >
                    <Star
                        className={`${pos.size} ${pos.color.startsWith('text') ? pos.color : ''}`}
                        style={!pos.color.startsWith('text') ? { color: pos.color } : undefined}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default Sparkles;