import React, { useState } from 'react';
import SearchIcon from '@/assets/icons/search.svg?react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchInput = ({ value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search"
                className={`
                    bg-bg-secondary dark:bg-black/50
                    w-full rounded-lg py-2 px-4 outline-none ring-0 
                    transition-all duration-300 ease-in-out
                    ${isFocused ? 'text-left pl-10' : 'text-center placeholder:text-center'}
                `}
            />
            <motion.div
                animate={{
                    x: isFocused ? 16 : 'calc(50% - 50px)',
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                }}
                className="absolute top-1/2 -translate-y-1/2"
            >
                <SearchIcon className="w-4 h-4 pointer-events-none text-label-secondary" />
            </motion.div>
        </div>
    );
};

export default SearchInput;