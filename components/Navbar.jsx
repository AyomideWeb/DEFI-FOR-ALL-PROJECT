import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton } from './';
import { defilogo, menu, search } from '../assets';
import { navlinks } from '../constants';

const Navbar = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState('dashboard');
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const { connect, address } = useStateContext();

    return (
        <div className='flex md:flex-row flex-col-reverse justify-between
        mb-[35px] gap-6'>
            <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#310322] rounded-[100px]'>
                <input type='text' placeholder='Search for Existing Projects' className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#8c989b] 
                text-white bg-transparent outline-none'/>

                <div className='w-[72px] h-full rounded-[20px] bg-[#22c55e] flex justify-center items-center cursor-pointer'>
                    <img src={search} alt="search" className='w-[15px] h-[15px] object-contain' />
                </div>
            </div>

            <div className='sm:flex hidden flex-row justify-end gap-4 '>
                <CustomButton
                    btnType='button'
                    title={address ? 'Create a Project Campaign' : 'Connect'}
                    styles={address ? 'bg-[#22c55e]' : 'bg-[#fbb245]'}
                    handleClick={() => {
                        if (address) navigate('create_project')
                        else connect();
                    }}
                />
            </div>

            {/*  For Small Screen Navigations...
            <div className='sm:hidden flex justify-between items-center relative'>
                <div className=''>

                </div>

            </div>
                */}
        </div>
    )
}

export default Navbar