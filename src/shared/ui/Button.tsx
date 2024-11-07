import React from 'react';

interface props {
    className?: string
    children: React.ReactNode
    soldOut?: boolean
}

const Button = ({className, children, soldOut,...props}) => {
    return (
        <button
            {...props}
            className={`${soldOut ? 'bg-bg-secondary text-label-secondary' : 'bg-blue text-white'} rounded-full py-1.5 gap-2 font-semibold flex justify-center items-center px-5 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;