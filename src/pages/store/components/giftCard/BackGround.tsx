import React from "react";
import TgPattern from "@/assets/tg-pattern.png";
import classNames from "classnames";
import {gradientClassNames} from "@/shared/consts.ts";

export const Background = React.memo(({ color }: { color: Props['color'] }) => (
    <div className="absolute inset-0">
        <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${TgPattern})` }}
        />
        <div className={classNames('absolute inset-0 bg-opacity-10', gradientClassNames[color])} />
    </div>
));
