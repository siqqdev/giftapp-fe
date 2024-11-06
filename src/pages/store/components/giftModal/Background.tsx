import React from 'react';
import classNames from "classnames";
import TgPattern from "@/assets/tg-pattern.png";
import { gradientClassNames } from "@/shared/consts.ts";
import {GiftAnimationName} from "@/inerfaces/interfaces.ts";

interface props {
    name: GiftAnimationName;
}

const Background = ({ name }: props) => (
    <div className="absolute inset-0">
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-5 dark:opacity-15"
            style={{ backgroundImage: `url(${TgPattern})` }}
        />
        <div className={classNames('absolute inset-0', gradientClassNames[name])} />
    </div>
);

export default React.memo(Background);