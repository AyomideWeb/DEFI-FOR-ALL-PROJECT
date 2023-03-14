import React from 'react'

const NumberBox = ({ title, value }) => {
    return (
        <div className="flex flex-col items-center w-[150px]">
            <h4 className="font-epilogue font-bold text-[30px] text-white p-3 
            bg-[#310322] rounded-t-[10px] w-full text-center truncate">{value}</h4>
            <p className="font-epilogue font-normal text-[16px] text-white
             bg-[#22c55e] px-3 py-2 w-full rounded-b-[10px] text-center truncate">{title}</p>
        </div>
    )
}

export default NumberBox