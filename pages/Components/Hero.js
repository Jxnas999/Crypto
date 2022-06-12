import React from "react";
import Typed from "react-typed";
export default function Hero() {
  return (
    <div className='bg-[#080512] h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center text-2xl font-bold  md:text-5xl'>
        <h1 className='text-white'>Your Cryptocurrency update for</h1>

        <Typed
          className='text-[#3ca5f6]  mt-2 mb-4'
          strings={["$Bitcoin", "$Ethereum", "$USD Coin", "$Tether", "$XRP"]}
          typeSpeed={100}
          backSpeed={70}
          loop
        />
        <button className='font-poppins bg-black rounded-lg font-normal text-lg md:text-2xl py-1 px-4 md:px-6 text-neutral-50 hover:text-[#3ca5f6] duration-150'>
          Search
        </button>
      </div>
    </div>
  );
}
