import React from 'react';
import classNames from "classnames";
import TgPattern from "@/assets/tg-pattern.png";
import { gradientClassNames } from "@/shared/consts.ts";

interface BackgroundProps {
    color: string;
}

const Background = ({ color }: BackgroundProps) => (
    <div className="absolute inset-0">
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${TgPattern})` }}
        />
        <div className={classNames('absolute inset-0 bg-opacity-10', gradientClassNames[color])} />
    </div>
);

export default React.memo(Background);