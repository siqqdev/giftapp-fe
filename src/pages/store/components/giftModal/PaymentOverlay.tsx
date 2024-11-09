import {useTranslation} from "react-i18next";

const PaymentOverlay = ({ secondsLeft, onClick }) => {
    const {t} = useTranslation()

    return (
        <div className="fixed inset-0 bg-neutral-900/50 z-[100] flex items-center justify-center backdrop-blur-sm">
            <div className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
                <div
                    className="animate-spin w-8 h-8 border-4 border-neutral-600 border-t-transparent rounded-full mx-auto mb-4"/>
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-neutral-50">{t('payment.title')}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-2">
                    {t('payment.subtitle')}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{t('payment.timeLeft')} {secondsLeft}</p>
                <button onClick={onClick} className='text-cyan'>{t('cancel')}</button>
            </div>
        </div>
    );
}

export default PaymentOverlay