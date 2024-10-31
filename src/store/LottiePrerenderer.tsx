import React, { useEffect } from 'react';
import Lottie from 'lottie-web';
import { animations, AnimationName } from './lottieStore';

export const LottiePreloader = () => {
    useEffect(() => {
        // Предзагружаем все анимации
        const preloadedInstances = new Map();

        Object.entries(animations).forEach(([name, data]) => {
            // Создаем временный контейнер
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.visibility = 'hidden';
            container.style.pointerEvents = 'none';
            document.body.appendChild(container);

            // Создаем инстанс для предзагрузки
            const instance = Lottie.loadAnimation({
                container,
                animationData: data,
                renderer: 'svg',
                loop: false,
                autoplay: false,
            });

            preloadedInstances.set(name, { instance, container });
        });

        return () => {
            // Очищаем все предзагруженные инстансы
            preloadedInstances.forEach(({ instance, container }) => {
                instance.destroy();
                container.remove();
            });
        };
    }, []);

    return null;
};