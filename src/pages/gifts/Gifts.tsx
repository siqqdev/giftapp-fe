import React from 'react';
import BalloonsPlaceholder from "@/shared/components/BalloonsPlaceholder.tsx";
import {useNavigate} from "react-router-dom";

const Gifts = () => {
    const navigate = useNavigate();
    const hasItems = false;

    return (
        <div className='flex flex-col gap-6 pt-10 px-4'>
            <div className='flex flex-col gap-2'>
                <p className='tracking-tighter font-semibold text-2xl text-center'>Send Gifts in Telegram</p>
                <p className='text-label-secondary text-center text-lg'>Send gifts to users that can be stored <br/> in their app profile.</p>
            </div>

            {!hasItems ? (
                <BalloonsPlaceholder className='bg-bg-secondary rounded-2xl py-6'>
                    <>
                        <p className='text-xl tracking-tighter text-center mt-1'>You dont have any gifts yet.</p>
                        <button className='text-blue px-4 py-2 tex-xl' onClick={() => navigate('/store')}>
                            Open Store
                        </button>
                    </>
                </BalloonsPlaceholder>
            ) : (
                <div>
                    items
                </div>
            )}
        </div>
    );
};

export default Gifts;