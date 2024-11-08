import React from 'react';
import { motion } from 'framer-motion';
import i18n from "i18next";

const LanguageSwitch = () => {
    const [isEn, setIsEn] = React.useState(false);

    const toggleLanguage = () => {
        setIsEn(!isEn);
        i18n.changeLanguage('ru')
    };

    return (
        <motion.div
            className="relative flex items-center bg-bg-secondary dark:bg-black rounded-full p-0.5 w-[90px] h-9 cursor-pointer overflow-hidden"
            onClick={toggleLanguage}
            initial={false}
        >
            <motion.div
                className="absolute flex items-center justify-center w-[42px] h-8 bg-white dark:bg-[#2C2C2E] rounded-full shadow-md"
                animate={{
                    x: isEn ? '44px' : '2px',
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }}
            >
                <span className="font-medium text-sm text-black dark:text-white">
                    {isEn ? 'EN' : 'RU'}
                </span>
            </motion.div>

            <div className="flex justify-between w-full px-4">
                <span className="font-medium text-sm text-black dark:text-label-secondary">
                    RU
                </span>
                <span className="font-medium text-sm text-label-secondary dark:text-white">
                    EN
                </span>
            </div>
        </motion.div>
    );
};

export default LanguageSwitch;