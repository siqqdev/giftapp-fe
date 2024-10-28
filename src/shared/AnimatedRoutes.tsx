import React from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    in: {
        opacity: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    out: {
        opacity: 0,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
};

const pageTransition = {
    type: 'tween',
    ease: 'linear',
    duration: 0.15,
};

const AnimatedRoutes = ({ children }) => {
    const location = useLocation();

    const isGiftTransition = (pathname) => {
        return pathname.includes('/store') || pathname.includes('/product');
    };

    const shouldAnimate = !isGiftTransition(location.pathname);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <LayoutGroup>
                <AnimatePresence mode="wait" initial={false}>
                    {shouldAnimate ? (
                        <motion.div
                            key={location.pathname}
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                            style={{
                                overflow: 'auto',
                                height: '100%',
                                willChange: 'opacity, transform'
                            }}
                        >
                            <Routes location={location}>
                                {children}
                            </Routes>
                        </motion.div>
                    ) : (
                        <div
                            key={location.pathname}
                            style={{
                                height: '100%',
                                overflow: 'auto'
                            }}
                        >
                            <Routes location={location}>
                                {children}
                            </Routes>
                        </div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </div>
    );
};

export default AnimatedRoutes;