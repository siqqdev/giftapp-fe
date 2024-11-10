import {Drawer} from "@/shared/ui/Drawer.tsx";
import GiftInfoTable from "@/pages/gifts/components/GiftInfoTable.tsx";
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";
import Sparkles from "@/pages/gifts/components/Sparkles.tsx";
import {useTelegramButton} from "@/hooks/useTelegramButton.ts";
import {useEffect, useCallback} from "react";
import {CurrencyType, ITgUser} from "@/inerfaces/interfaces.ts";
import {useTranslation} from "react-i18next";
import {useSendGiftMutation} from "@/api/endpoints/giftApi.ts";

type props = {
    isProfile?: boolean;
    giftName: string
    isOpen: boolean;
    onClose: () => void;
    date: string;
    callback?: () => void;
    price: string;
    receivedAmount: number;
    user: ITgUser;
    asset: CurrencyType;
    giftId?: string;
} & ({ user: number } | { giftName: string });

const GiftDrawer = ({ giftId, isProfile, isOpen, onClose, date, callback, user, giftName, price, receivedAmount, asset }: props) => {
    const {t} = useTranslation()
    const [sendGiftReq] = useSendGiftMutation()

    const handleSendGift = async () => {
        try {
            const res = await sendGiftReq(giftId).unwrap();
            onClose();
            setTimeout(() => {
                window.Telegram.WebApp.switchInlineQuery(res?.hash, ['users']);
            }, 100);
        } catch (error) {
            console.error('Error sending gift:', error);
        }
    }

    const {show, hide} = useTelegramButton({
        onClick: async () => {
            if (giftId) {
                await handleSendGift();
            } else if (callback) {
                await callback();
            }
        },
        initialParams: {
            text: isProfile ? t('drawer.tgButtonTextProfile') : t('drawer.tgButtonText'),
        }
    });

    useEffect(() => {
        if (isOpen) {
            show();
        }

        return () => {
            hide();
        };
    }, [isOpen]);

    return (
        <Drawer isOpen={isOpen} onClose={onClose} className="bg-bg-secondary dark:bg-bg-dark text-black dark:text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-40 h-40">
                    <div className="absolute inset-0">
                        <Sparkles />
                    </div>
                    <AnimatedLottie
                        animationName={giftName}
                        className="w-full h-full relative z-10"
                    />
                </div>
                <h2 className="text-xl font-semibold">{isProfile ? giftName : t('drawer.title')}</h2>
                <GiftInfoTable
                    giftName={!isProfile && giftName}
                    user={user}
                    date={date}
                    price={price}
                    availability={`${receivedAmount} ${t('of')} 10K`}
                    asset={asset}
                    receivedAmount={receivedAmount}
                    isProfile={isProfile}
                />
            </div>
        </Drawer>
    );
};

export default GiftDrawer;