import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const lottieInstances = new Map();

export const useLottiePreloader = (animationData: any) => {
    const instanceRef = useRef<any>(null);

    useEffect(() => {
        if (lottieInstances.has(animationData)) {
            instanceRef.current = lottieInstances.get(animationData);
            return;
        }

        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.opacity = '0';
        container.style.pointerEvents = 'none';
        document.body.appendChild(container);

        const instance = lottie.loadAnimation({
            container,
            animationData,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            rendererSettings: {
                progressiveLoad: false,
                hideOnTransparent: true,
                clearCanvas: false,
            }
        });

        instance.addEventListener('DOMLoaded', () => {
            instance.pause();
            container.remove();
        });

        lottieInstances.set(animationData, instance);
        instanceRef.current = instance;

        return () => {
            if (!document.body.contains(container)) {
                instance.destroy();
                lottieInstances.delete(animationData);
            }
        };
    }, [animationData]);

    return instanceRef.current;
};