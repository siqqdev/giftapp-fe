import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import {AnimationName, animations} from "@/store/lottieStore.ts";

interface AnimatedLottieProps {
    name: AnimationName;
    className?: string;
}

export const AnimatedLottie = React.memo(({ name, className }: AnimatedLottieProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lottieRef = useRef<any>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        lottieRef.current = Lottie.loadAnimation({
            container,
            animationData: animations[name],
            renderer: 'svg',
            loop: true,
            autoplay: true,
            rendererSettings: {
                progressiveLoad: false,
                hideOnTransparent: true,
            }
        });

        const instance = lottieRef.current;

        // Добавляем обработчик для проверки загрузки
        instance.addEventListener('DOMLoaded', () => {
            instance.play();
        });

        return () => {
            if (instance) {
                instance.destroy();
            }
        };
    }, [name]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                willChange: 'transform',
                lineHeight: 0,
            }}
        />
    );
});

AnimatedLottie.displayName = 'AnimatedLottie';