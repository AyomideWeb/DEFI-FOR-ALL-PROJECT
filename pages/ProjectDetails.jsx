import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton, NumberBox, Loading } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { profile } from '../assets';

const ProjectDetails = () => {
  const { state } = useLocation();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loading />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-30px">
        <div className="flex-1 flex-col">
          <img src={state.photos} alt="Project photo" className="w-full h-[410px] object-cover rounded-xl" />
          <div className="relative w-full h-[5px] bg-[#310322] mt-2">
            <div className="absolute h-full bg-[#310322]" style={{ width: `${calculateBarPercentage(state.target, state.fundsCollected)}%`, maxWidth: '400%' }}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <NumberBox title="Days Remaining" value={remainingDays} />
          <NumberBox title={`Raised of ${state.target}`} value={state.fundsCollected} />
          <NumberBox title="Number of Donators" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[20px] text-white">CREATOR OF PROJECT</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#310322] cursor-pointer">
                <img src={profile} alt="Owner" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div className="flex-col py-2 px-3 rounded-[30px] items-center justify-center bg-[#310322]">
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">15 Project Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[20px] text-white">STORY</h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.about}</p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[20px] text-white">DONATORS</h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? donators.map((item, index) => (
                <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                  <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{index + 1}.{item.donator}</p>
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">{index + 1}.{item.donations}</p>
                </div>
              )) : (
                <p className="font-epilogue font-normal font-[16px] text-[#808191] leading-[26px] text-justify">No Donators Yet. We will be glad to have you as the first!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 ">
          <h4 className="font-epilogue font-semibold text-[20px] text-white">MAKE PAYMENT</h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#310322] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading=[30px] 
            text-center text-[#808191]"> Make Payment into the Project Campaign</p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#313143]
                 bg-transparent font-epilogue text-white text-[18px] leading-[30px] 
                 placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#310322] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] 
                leading-[22px] text-white">Givers Never Lack.</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] 
                text-[#808191]">Give your support to this project to help humanity be a better world.</p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Project"
                styles="w-full bg-[#22c55e]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails