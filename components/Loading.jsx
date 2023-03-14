import React from 'react'

import { loading_icon } from '../assets';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] 
        flex items-center justify-center flex-col">
            <img src={loading_icon} alt="loading..."
                className="w-[300px] h-[300px] object-contain" />
            <p className="mt-[1px] font-epilogue font-bold text-[20px] text-white text-center">Please Sit Back and <br /> Wait while the transaction is in process...</p>

        </div>
    )
}

export default Loading