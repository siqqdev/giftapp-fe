import React from 'react';
import { motion } from 'framer-motion';

const PortalBackground = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 bg-white dark:bg-bg-dark"
    />
);

export default React.memo(PortalBackground);