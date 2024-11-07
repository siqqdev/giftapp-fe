import {Drawer} from "@/shared/ui/Drawer.tsx";
import GiftInfoTable from "@/pages/gifts/components/GiftInfoTable.tsx";
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";
import Sparkles from "@/pages/gifts/components/Sparkles.tsx";
import {useTelegramButton} from "@/hooks/useTelegramButton.ts";
import {useEffect, useCallback} from "react";
import {CurrencyType, ITgUser} from "@/inerfaces/interfaces.ts";

type props = {
    isProfile?: boolean;
    giftName: string
    isOpen: boolean;
    onClose: () => void;
    date: string;
    callback: () => void;
    price: string;
    receivedAmount: number;
    user: ITgUser;
    asset: CurrencyType;
} & ({ user: number } | { giftName: string });

const GiftDrawer = ({ isProfile, isOpen, onClose, date, callback, user, giftName, price, receivedAmount, asset }: props) => {
    console.log(date, price, asset)
    const {show, hide} = useTelegramButton({
        onClick: callback,
        initialParams: {
            text: isProfile ? 'Close' : 'Send Gift to Contact',
        }
    });

    useEffect(() => {
        if (isOpen) show();
        return () => hide();
    }, [isOpen, show, hide]);

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
                <h2 className="text-xl font-semibold">{isProfile ? giftName : 'Send Gift to Contact'}</h2>
                <GiftInfoTable
                    user={user}
                    date={date}
                    price={price}
                    availability={`${receivedAmount} of 10K`}
                    asset={asset}
                    receivedAmount={receivedAmount}
                    isProfile={isProfile}
                />
            </div>
        </Drawer>
    );
};

export default GiftDrawer;