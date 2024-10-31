import Star from '@/assets/icons/star.svg?react'
import {useMemo} from "react";
import {motion} from 'framer-motion'

const Sparkles = () => {
    const sparklePositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 50; i++) {
            const position = i % 4;
            let x, y;

            switch (position) {
                case 0:
                    x = Math.random() * -150 - 50;
                    y = Math.random() * 200 - 150;
                    break;
                case 1:
                    x = Math.random() * 150 + 50;
                    y = Math.random() * 200 - 150;
                    break;
                case 2:
                    x = Math.random() * -150 - 50;
                    y = Math.random() * 200 - 150;
                    break;
                case 3:
                    x = Math.random() * 160 - 80;
                    y = Math.random() * -40 - 40;
                    break;
            }

            const isGold = Math.random() > 0.7;

            positions.push({
                x,
                y,
                scale: Math.random() * 0.4 + 0.2,
                delay: Math.random() * 3,
                duration: 1.5 + Math.random(),
                repeatDelay: Math.random() * 3,
                color: isGold ? 'text-gold' : '#FECC13'
            });
        }
        return positions;
    }, []);

    return (
        <div className="absolute w-full h-full overflow-hidden pointer-events-none">
            {sparklePositions.map((pos, index) => (
                <motion.div
                    key={index}
                    className="absolute left-1/2 top-1/2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, pos.scale, 0],
                    }}
                    transition={{
                        duration: pos.duration,
                        delay: pos.delay,
                        repeat: Infinity,
                        repeatDelay: pos.repeatDelay,
                        ease: "easeInOut"
                    }}
                    style={{
                        x: pos.x,
                        y: pos.y,
                    }}
                >
                    <Star
                        className={`w-7 h-7 ${pos.color.startsWith('text') ? pos.color : ''}`}
                        style={!pos.color.startsWith('text') ? { color: pos.color } : undefined}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default Sparkles;