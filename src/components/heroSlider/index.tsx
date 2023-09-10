/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'
import { IconContext } from "react-icons"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"


const HeroSlider = () => {
  const images = ["/assets/hero_sport_4.jpg", "/assets/hero_sport_3.jpg", "/assets/hero_sport.jpg"]
  const [counter, setcounter] = useState(0)
  const handleChangeR = ()=>{
   if (counter == images.length -1) {
    setcounter(0)
   }else {
    setcounter(prevState => prevState + 1)

   }
  }
  const handleChangeL = ()=>{
    if (counter == 0) {
     setcounter(images.length - 1)
    }else {
     setcounter(prevState => prevState - 1)
 
    }
   }

  return (

    <div className='relative'>
      <img src={images[counter]} alt='hero image' className='w-full h-[26rem] object-cover object-center' />

      <IconContext.Provider value={{ className:"w-10 h-10 text-white opacity-75 scale-90 cursor-pointer hover:opacity-100 hover:scale-125 hover:ease-in hover:duration-300" }}>
        <div onClick={handleChangeL} className='absolute top-[42%] left-[4%]' >
            <FaAngleLeft />
        </div>
        
      </IconContext.Provider>

      <IconContext.Provider value={{ className:"w-10 h-10 text-white opacity-75 scale-90 cursor-pointer hover:opacity-100 hover:scale-125 hover:ease-in hover:duration-300" }}>
        <div onClick={handleChangeR} className='absolute top-[42%] right-[4%]'>
            <FaAngleRight />
        </div>
      </IconContext.Provider>

    </div>
  )
}

export default HeroSlider
