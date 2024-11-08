import React, { useState } from 'react';
import Search from '@/assets/icons/search.svg?react';
import {useTranslation} from "react-i18next";

const SearchInput = () => {
    const {t} = useTranslation()
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={t('search')}
                className={`
                    bg-bg-secondary dark:bg-black/50
                    w-full rounded-lg py-2 px-4 outline-none ring-0 
                    transition-all duration-300 ease-in-out
                    ${isFocused ? 'text-left pl-10' : 'text-center placeholder:text-center'}
                `}
            />
            <div
                className={`
                    absolute top-1/2 -translate-y-1/2
                    transition-all duration-300 ease-in-out
                    pointer-events-none text-label-secondary text-lg
                    ${isFocused ? 'left-3' : 'left-1/2 -translate-x-14'}
                `}
            >
                <Search className="w-5 h-5 text-zinc-500" />
            </div>
        </div>
    );
};

export default SearchInput;