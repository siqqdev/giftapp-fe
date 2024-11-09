import React, { useMemo, forwardRef, useState } from 'react';
import { getPfpUrl } from "@/shared/utils.ts";

interface Props {
    className?: string;
    file?: string;
    firstName?: string;
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
    const [isImageLoading, setIsImageLoading] = useState(!!file);
    const colors = ['bg-cyan', 'bg-blue', 'bg-gold', 'bg-green', 'bg-red'];

    const initials = useMemo(() => {
        if (!firstName) return '';
        const first = firstName.charAt(0).toUpperCase();
        const last = lastName ? lastName.charAt(0).toUpperCase() : '';
        return `${first}${last}`;
    }, [firstName, lastName]);

    const randomColor = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }, []);

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    return (
        <div ref={ref} className="flex flex-col items-center">
            {file ? (
                <div className="relative">
                    {isImageLoading && (
                        <div className={`absolute inset-0 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse ${className}`} />
                    )}
                    <img
                        className={`rounded-full ${className} ${isImageLoading ? 'invisible' : 'visible'}`}
                        src={getPfpUrl(file)}
                        alt='avatar'
                        onLoad={handleImageLoad}
                    />
                </div>
            ) : (
                <div
                    className={`rounded-full flex items-center justify-center ${randomColor} bg-opacity-70 hover:bg-opacity-100 transition-all ${className || 'w-12 h-12'}`}
                >
                    {initials && (
                        <span className="text-white text-5xl font-semibold">
                            {initials}
                        </span>
                    )}
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