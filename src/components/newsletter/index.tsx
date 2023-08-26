/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'


const Newsletter = () => {

  const [inputMailNewsletter, setInputMailNewsletter] = useState<string>("")    

  return (

    <div className='w-full h-[18rem] flex border border-grayLight bg-accent2'>

      <div className='w-[52%] h-full ml-8 flex flex-col justify-center'>
        <h2 className='mb-1 text-2xl font-semibold text-text'> Subscribe to our newsletter </h2> 
        <p className='mb-7 text-sm font-medium text-text max-w-[37rem]' > Subscribe to stay tune for news, releases, discounts on selected brands, special events in stores and more! </p>
        <div className='flex flex-row gap-6'>
            <input className='pl-3 w-[28rem] h-11 border border-gray' 
                placeholder='e.g. hoody@mail.com'
                value={ inputMailNewsletter }
                onChange={ e => setInputMailNewsletter( e.target.value )}
            />
            <button className='w-32 h-11 bg-blackZinc text-white'> Subscribe </button>
        </div>
      </div>

      <div className='w-[48%] h-full' >
        <img src='/assets/newsletter_cover.jpg' alt='' className='w-full h-full object-cover' />
      </div>

    </div>
  )
}

export default Newsletter
