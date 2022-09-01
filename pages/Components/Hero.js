import React from "react";
import TypewriterComponent from "typewriter-effect";
export default function Hero() {
  function handleClick() {
    document
      .getElementById("maindisplay")
      ?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className='bg-[#080512] h-screen text-[#3ca5f6] flex items-center justify-center'>
      <div className='flex flex-col items-center text-2xl font-bold md:text-5xl'>
        <h1 className='text-white'>Your Cryptocurrency update for</h1>

        <TypewriterComponent
          className='text-[#3ca5f6]  mt-2 mb-4'
          onInit={(typewriter) => {
            typewriter
              .typeString("$Bitcoin")
              .pauseFor(1000)
              .deleteAll()
              .typeString("$Ethereum")
              .pauseFor(1000)
              .deleteAll()
              .typeString("$USD Coin")
              .pauseFor(1000)
              .deleteAll()
              .typeString("$Tether")
              .pauseFor(1000)
              .deleteAll()
              .typeString("$XRP")
              .start();
          }}
        />
        <button
          onClick={handleClick}
          className='font-poppins mt-4 bg-black rounded-lg font-normal text-lg md:text-2xl py-1 px-4 md:px-6 text-neutral-50 hover:text-[#3ca5f6] duration-150'
        >
          Explore
        </button>
      </div>
    </div>
  );
}
