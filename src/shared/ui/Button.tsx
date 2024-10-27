import React from 'react';

const Button = ({children}) => {
    return (
        <button
            className={`bg-blue rounded-xl w-full py-3 font-semibold text-white text-lg`}
        >
            {children}
        </button>
    );
};

export default Button;