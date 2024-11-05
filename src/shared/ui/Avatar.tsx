import React from 'react';

interface props {
    className?: string;
    pfp: string;
    place?: number
}

const Avatar = ({className, pfp, place}: props) => {
    return (
        <div className="flex flex-col items-center">
            <img className={`rounded-full ${className}`} src={pfp} alt='avatar'/>
            {place && (
                <div className='-mt-10 px-3 py-1 rounded-full bg-gold tracking-wide text-white border-white border-[2px] font-semibold translate-y-1/2'>
                    #{place}
                </div>
            )}
        </div>
    );
};

export default Avatar;