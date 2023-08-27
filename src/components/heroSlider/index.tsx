/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'
import { IconContext } from "react-icons"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"


const HeroSlider = () => {

  return (

    <div className='relative'>
      <img src="/assets/hero_sport.jpg" alt='hero image' className='w-full h-[26rem] object-cover' />
      
      <IconContext.Provider value={{ className:"w-10 h-10 text-white opacity-75 scale-90 cursor-pointer hover:opacity-100 hover:scale-125 hover:ease-in hover:duration-300" }}>
        <div className='absolute top-[42%] left-[4%]' >
            <FaAngleLeft />
        </div>
        
      </IconContext.Provider>

      <IconContext.Provider value={{ className:"w-10 h-10 text-white opacity-75 scale-90 cursor-pointer hover:opacity-100 hover:scale-125 hover:ease-in hover:duration-300" }}>
        <div className='absolute top-[42%] right-[4%]'>
            <FaAngleRight />
        </div>
      </IconContext.Provider>

    </div>
  )
}

export default HeroSlider
