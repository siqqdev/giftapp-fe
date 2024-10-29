import React from 'react';
import {AnimatedLottie} from "@/shared/components/AnimatedLottie.tsx";
import BalloonsAnim from "@/assets/animations/emoji-balloons.json";

const BalloonsPlaceholder = ({className, children}) => {
    return (
        <div className={`h-full flex flex-col justify-center items-center ${className}`}>
            <AnimatedLottie layoutId={undefined} animationData={BalloonsAnim} className="w-40 h-40"/>
            {children}
        </div>
    );
};

export default BalloonsPlaceholder;