import { memo, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import X from '@/assets/icons/xicon.svg?react'

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
};

const drawerVariants = {
    hidden: {
        y: "100%",
        transition: {
            type: "tween",
            duration: 0.2,
            ease: [0.4, 0, 1, 1], // быстрый старт, плавное окончание
        }
    },
    visible: {
        y: 0,
        transition: {
            type: "tween",
            duration: 0.35,
            ease: [0.2, 0, 0, 1], // плавное ускорение и очень плавное замедление
        }
    }
};

export const Drawer = memo(({ isOpen, onClose, className, children }) => {
    const handleDragEnd = useCallback((_, info) => {
        if (info.offset.y > 50) {
            onClose();
        }
    }, [onClose]);

    const dragConfig = useMemo(() => ({
        constraints: { top: 0 },
        dragElastic: 0.05,
        dragTransition: {
            bounceStiffness: 400,
            bounceDamping: 40
        }
    }), []);

    const content = useMemo(() => (
        <div className="relative">
            <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label="Close drawer"
            >
                <X size={20} />
            </button>

            <div className="p-4">
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full mb-6 mx-auto"/>
                {children}
            </div>
        </div>
    ), [children, onClose]);

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-50">
                    <motion.div
                        key="overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black will-change-opacity"
                    />

                    <motion.div
                        key="drawer"
                        variants={drawerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        drag="y"
                        dragDirectionLock
                        {...dragConfig}
                        onDragEnd={handleDragEnd}
                        className={`fixed bottom-0 left-0 right-0 rounded-t-xl bg-white dark:bg-bg-dark shadow-lg outline-none ${className}`}
                        style={{
                            maxHeight: '70vh',
                            touchAction: 'none',
                            overscrollBehavior: 'contain',
                            WebkitOverflowScrolling: 'touch',
                            willChange: 'transform',
                            transform: 'translate3d(0,0,0)',
                            backfaceVisibility: 'hidden'
                        }}
                    >
                        {content}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
});

Drawer.displayName = 'Drawer';