import { motion, AnimatePresence } from 'framer-motion';
import {getGiftImage} from "@/shared/utils.ts";
import {GiftAnimationName} from "@/inerfaces/interfaces.ts";

interface ToastProps {
    message: string;
    subMessage: string;
    onClose: () => void;
    buttonText?: string;
    giftName?: GiftAnimationName;
}

const Toast = ({ message, subMessage, onClose, buttonText = 'Send', giftName = 'Delicious Cake' }: ToastProps) => (
    <AnimatePresence>
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 40
            }}
            className="fixed bottom-0 left-0 right-0 bg-bg-notification dark:bg-black text-white px-4 py-2 flex items-center justify-between m-4 rounded-2xl"
        >
            <div className="flex items-center gap-3">
                <img src={getGiftImage(giftName)} alt="" className='w-8 h-8 rounded-full'/>
                <div className="flex flex-col text-sm">
                    <span className="font-medium">{message}</span>
                    <span className="text-sm">{subMessage}</span>
                </div>
            </div>
            <button onClick={onClose} className="text-cyan font-medium">
                {buttonText}
            </button>
        </motion.div>
    </AnimatePresence>
);

export default Toast;