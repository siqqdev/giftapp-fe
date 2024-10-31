import React from 'react';

const Button = ({className ,children, ...props}) => {
    return (
        <button
            {...props}
            className={`bg-blue rounded-full py-1.5 gap-2 font-semibold text-white flex justify-center items-center px-5 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;