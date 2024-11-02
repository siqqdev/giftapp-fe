import {Drawer} from "@/shared/components/Drawer.tsx";
import GiftInfoTable from "@/pages/gifts/components/GiftInfoTable.tsx";
import Cake from '@/assets/animations/gift-delicious-cake.json'
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";
import Sparkles from "@/pages/gifts/components/Sparkles.tsx";
import {useTelegramButton} from "@/hooks/useTelegramButton.ts";
import {useEffect, useCallback} from "react";

const GiftDrawer = ({ isOpen, onClose, giftData }) => {
    const shareUrl = 'https://t.me/share/url?url=https://example.com/gift';

    const handleShare = useCallback(() => {
        window.Telegram?.WebApp?.openTelegramLink?.(shareUrl);
    }, [shareUrl]);

    const {show, hide} = useTelegramButton({
        onClick: handleShare,
        initialParams: {
            text: 'Share Gift'
        }
    });

    useEffect(() => {
        if (isOpen) show();
        return () => hide();
    }, [isOpen, show, hide]);

    return (
        <Drawer isOpen={isOpen} onClose={onClose} className="bg-bg-secondary dark:bg-bg-dark text-black dark:text-white">
            <div className="flex flex-col items-center gap-4 relative">
                <div className="relative">
                    <Sparkles />
                    <AnimatedLottie
                        animationData={Cake}
                        layoutId={44}
                        className="w-40 h-40"
                    />
                </div>
                <h2 className="text-xl font-semibold">Send Gift</h2>
                <GiftInfoTable
                    gift="Delicious Cake"
                    date="23 october"
                    price="100"
                    availability="3 of 100"
                />
            </div>
        </Drawer>
    );
};

export default GiftDrawer;