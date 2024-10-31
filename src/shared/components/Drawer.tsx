import { memo, useCallback } from 'react';
import Modal from 'react-modal';
import { motion, AnimatePresence } from 'framer-motion';
import X from '@/assets/icons/xicon.svg?react'

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
};

const drawerVariants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
};

const transitionConfig = {
    type: "spring",
    damping: 40,
    stiffness: 400,
    mass: 0.8
};

export const Drawer = memo(({ isOpen, onClose, className, children }) => {
    const handleDragEnd = useCallback((_, info) => {
        if (info.offset.y > 50) {
            onClose();
        }
    }, [onClose]);

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    className="fixed bottom-0 left-0 right-0 bg-transparent outline-none"
                    overlayClassName="fixed inset-0 bg-transparent"
                    style={{ content: { padding: 0 } }}
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                >
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
                        transition={transitionConfig}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.1}
                        onDragEnd={handleDragEnd}
                        className={`rounded-t-xl w-full outline-none relative will-change-transform ${className}`}
                        style={{
                            maxHeight: '70vh',
                            touchAction: 'none',
                            overscrollBehavior: 'contain',
                            transform: 'translateZ(0)'
                        }}
                    >
                        <div className="relative">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 p-1 bg-[#E3E3E8] rounded-full transition-colors"
                                aria-label="Close drawer"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-4">
                                <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-6 mx-auto"/>
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
});

Drawer.displayName = 'Drawer';

