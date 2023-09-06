/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'


const Newsletter = () => {

  const [inputMailNewsletter, setInputMailNewsletter] = useState<string>("")    

  return (

    <div className='w-full h-auto border border-grayLight bg-accent2 sm:flex sm:h-[18rem]  '>

      <div className='mb-7 w-full h-full px-8 flex flex-col justify-center sm:w-[52%] sm:mb-0 '>
        <div className='max-w-[96%]' >
          <h2 className='mb-1 mt-3 text-xl font-semibold text-text sm:text-2xl '> Subscribe to our newsletter </h2> 
          <p className='mb-5 text-sm font-medium text-text max-w-[37rem]' > Subscribe to stay tune for news, releases, discounts on selected brands, special events in stores and more! </p>
          <div className=' md:flex md:flex-row md:gap-6'>
            <input className='mb-4 pl-4 w-full h-11 border border-gray md:w-[60%]' 
                placeholder='e.g. hoody@mail.com'
                value={ inputMailNewsletter }
                onChange={ e => setInputMailNewsletter( e.target.value )}
            />
            <button className='w-full h-11 bg-blackZinc text-white md:w-[30%]'> Subscribe </button>
          </div>
        </div>
       
      </div>

      <div className='w-full h-[14rem] sm:w-[48%] sm:h-full' >
        <img src='/assets/newsletter_cover.jpg' alt='' className='w-full h-full object-cover' />
      </div>

    </div>
  )
}

export default Newsletter
