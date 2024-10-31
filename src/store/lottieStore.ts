import effectGiftPurchased from '@/assets/animations/effect-gift-purchased.json';
import emojiBalloons from '@/assets/animations/emoji-balloons.json';
import giftBlueStar from '@/assets/animations/gift-blue-star.json';
import giftDeliciousCake from '@/assets/animations/gift-delicious-cake.json';
import giftGreenStar from '@/assets/animations/gift-green-star.json';
import giftRedStar from '@/assets/animations/gift-red-star.json';

export const animations = {
    'effect-gift-purchased': effectGiftPurchased,
    'emoji-balloons': emojiBalloons,
    'gift-blue-star': giftBlueStar,
    'gift-delicious-cake': giftDeliciousCake,
    'gift-green-star': giftGreenStar,
    'gift-red-star': giftRedStar,
} as const;

export type AnimationName = keyof typeof animations;