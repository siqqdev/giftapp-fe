import effectGiftPurchased from '@/assets/animations/effect-gift-purchased.json';
import emojiBalloons from '@/assets/animations/emoji-balloons.json';
import giftBlueStar from '@/assets/animations/gift-blue-star.json';
import giftDeliciousCake from '@/assets/animations/gift-delicious-cake.json';
import giftGreenStar from '@/assets/animations/gift-green-star.json';
import giftRedStar from '@/assets/animations/gift-red-star.json';
import tabGifts from '@/assets/animations/tab-gifts.json';
import tabLeaderboard from '@/assets/animations/tab-leaderboard.json';
import tabProfile from '@/assets/animations/tab-profile.json';
import tabStore from '@/assets/animations/tab-store.json';

const animations = {
    'effect-gift-purchased': effectGiftPurchased,
    'emoji-balloons': emojiBalloons,
    'gift-blue-star': giftBlueStar,
    'gift-delicious-cake': giftDeliciousCake,
    'gift-green-star': giftGreenStar,
    'gift-red-star': giftRedStar,
    'tab-gifts': tabGifts,
    'tab-leaderboard': tabLeaderboard,
    'tab-profile': tabProfile,
    'tab-store': tabStore,
} as const;

export type AnimationName = keyof typeof animations;

const animationsCache = new Map<AnimationName, any>();

export const preloadAnimations = () => {
    Object.entries(animations).forEach(([name, data]) => {
        animationsCache.set(name as AnimationName, data);
    });
};

export const getAnimation = (name: AnimationName) => {
    return animationsCache.get(name) || animations[name];
};

import React, { useEffect } from 'react';

export const LottiePreloader = () => {
    useEffect(() => {
        preloadAnimations();
    }, []);

    return null;
};