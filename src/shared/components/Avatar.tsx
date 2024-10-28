import React from 'react';

interface props {
    className?: string;
    pfp: string;
    place?: number
}

const Avatar = ({className, pfp, place}) => {
    return (
        <>
            <img className={`rounded-full ${className}`} src={pfp} alt='avatar'/>
            {place && (
                <div className='-mt-10 px-3 py-1 rounded-full bg-gold tracking-wide text-white border-white border-[2px] font-semibold'>
                    #{place}
                </div>
            )}
        </>
    );
};

export default Avatar;