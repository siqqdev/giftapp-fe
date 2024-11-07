import React, { useMemo, forwardRef } from 'react';
import { getPfpUrl } from "@/shared/utils.ts";

interface Props {
    className?: string;
    file?: string;
    firstName: string;
    lastName?: string;
    place?: number;
}

const Avatar = forwardRef<HTMLDivElement, Props>(({
                                                      className = "",
                                                      file,
                                                      firstName,
                                                      lastName,
                                                      place
                                                  }, ref) => {
    const colors = ['bg-cyan', 'bg-blue', 'bg-gold', 'bg-green', 'bg-red'];

    const initials = useMemo(() => {
        const first = firstName?.charAt(0).toUpperCase();
        const last = lastName ? lastName.charAt(0).toUpperCase() : '';
        return `${first}${last}`;
    }, [firstName, lastName]);

    const randomColor = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }, []);

    return (
        <div ref={ref} className="flex flex-col items-center">
            {file ? (
                <img
                    className={`rounded-full ${className}`}
                    src={getPfpUrl(file)}
                    alt='avatar'
                />
            ) : (
                <div
                    className={`rounded-full flex items-center justify-center ${randomColor} bg-opacity-70 hover:bg-opacity-100 transition-all ${className || 'w-12 h-12'}`}
                >
                    <span className="text-white text-5xl font-semibold">
                        {initials}
                    </span>
                </div>
            )}
            {place && (
                <div className={`-mt-10 px-3 py-1 rounded-full ${place === 1 ? 'bg-gold' : 'bg-label-secondary'} tracking-wide text-white border-white border-[2px] font-semibold translate-y-1/2`}>
                    #{place}
                </div>
            )}
        </div>
    );
});


export default Avatar;