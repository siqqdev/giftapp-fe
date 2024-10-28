import React from 'react';

const Button = ({children, ...props}) => {
    return (
        <button
            {...props}
            className={`bg-blue rounded-full py-1.5 gap-2 font-semibold text-white flex justify-center items-center px-5`}
        >
            {children}
        </button>
    );
};

export default Button;