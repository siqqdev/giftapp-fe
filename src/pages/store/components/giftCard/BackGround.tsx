import React from "react";
import TgPattern from "@/assets/tg-pattern.png";
import classNames from "classnames";
import {gradientClassNames} from "@/shared/consts.ts";
import {GiftAnimationName} from "@/inerfaces/interfaces.ts";

interface props {
    animationName: GiftAnimationName
}

export const Background = React.memo(({ animationName }: props) => (
    <div className="absolute inset-0">
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-5 dark:opacity-15"
            style={{ backgroundImage: `url(${TgPattern})` }}
        />
        <div className={classNames('absolute inset-0 bg-opacity-10', gradientClassNames[animationName])} />
    </div>
));
