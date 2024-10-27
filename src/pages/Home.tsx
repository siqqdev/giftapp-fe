import React from 'react';
import Button from "../shared/ui/Button.tsx";
import Tab from '@/assets/animations/tab-gifts.json'
import Lottie from "lottie-react";
import TabBar from "@/shared/TabBar.tsx";

const Home = () => {
    return (
        <div className='px-4 py-2'>
            <Button>
                Send Gift TO Contact
            </Button>
            <TabBar />
        </div>
    );
};

export default Home;