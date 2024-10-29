import React from 'react';
import { motion } from 'framer-motion';
import Sun from '@/assets/icons/theme/sun.svg?react';
import Moon from '@/assets/icons/theme/moon.svg?react';
import {TelegramProvider} from "@/shared/TelegramProvider.ts";

const ThemeSwitch = () => {
    const [isDark, setIsDark] = React.useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.classList.contains('dark');
        }
        return false;
    });

    const toggleTheme = () => {
        if (isDark) {
            TelegramProvider.setLightTheme();
        } else {
            TelegramProvider.setDarkTheme();
        }
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <motion.div
            className="relative flex items-center bg-bg-secondary dark:bg-black rounded-full p-0.5 w-[90px] h-9 cursor-pointer overflow-hidden"
            onClick={toggleTheme}
            initial={false}
        >
            <motion.div
                className="absolute flex items-center justify-center w-[42px] h-8 bg-white dark:bg-[#2C2C2E] rounded-full shadow-md"
                animate={{
                    x: isDark ? '44px' : '2px',
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }}
            >
                <motion.div
                    initial={false}
                    animate={{
                        rotate: isDark ? 360 : 0
                    }}
                    transition={{
                        duration: 0.6
                    }}
                >
                    {isDark ? (
                        <Moon className="w-5 h-5 text-white" />
                    ) : (
                        <Sun className="w-5 h-5 text-black" />
                    )}
                </motion.div>
            </motion.div>

            <div className="flex justify-between w-full px-3">
                <Sun className="w-5 h-5 text-black dark:text-label-secondary" />
                <Moon className="w-5 h-5 text-label-secondary dark:text-white" />
            </div>
        </motion.div>
    );
};

export default ThemeSwitch;