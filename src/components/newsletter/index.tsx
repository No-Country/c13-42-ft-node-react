/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'


const Newsletter = () => {

  const [inputMailNewsletter, setInputMailNewsletter] = useState<string>("")   
  const [success, setSuccess] = useState<boolean>(false)  
  const [error, setError] = useState<any>(false)   
 

  const handleSubscribe =async()=>{
    try {
      if(inputMailNewsletter.length > 3){
        setInputMailNewsletter('')
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 2000);
      }else{
        throw {message: 'Invalid email 😥'}
      }
  
    } catch (error) {
      console.log(error);
      setError(error)
      
    }
  }



  return (

    <div className='w-full h-[18rem] flex items-center  border border-grayLight bg-accent2'>

      <div className='w-full h-full m-1 md:ml-8 flex flex-col justify-center sm:text-center md:text-left'>
        <h2 className='mb-1 text-2xl font-semibold text-text'> Subscribe to our newsletter </h2> 
        <p className='mb-7 text-sm font-medium text-text max-w-[37rem]' > Subscribe to stay tune for news, releases, discounts on selected brands, special events in stores and more! </p>
        <div className='flex items-center justify-center  md:justify-start flex-col md:flex-row gap-6'>
            <input className={` pl-3 w-3/4 m-1 md:w-1/4 h-8 border ${error ? 'border-red-500 rounded-md': 'rounded-md'}  ${success ? 'border-accentTeal':' border-gray'}  `}
                placeholder={error ? error.message : 'e.g. hoody@mail.com'}
                value={ inputMailNewsletter }
                onChange={ (e) => {
                  setError(false)
                  setInputMailNewsletter( e.target.value )}}
            />
            <button onClick={handleSubscribe} disabled={error||success} className={`w-3/4 md:w-1/6 h-8 border flex items-center rounded-md justify-center  ${error ? 'border-red-500':''} ${success ? 'border-accentTeal bg-white text-accentTeal':' bg-blackZinc text-white'} `}> {success ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
:
"Suscribe"} </button>
        </div>
      </div>

      <div className='hidden md:block md:w-[48%] h-full' >
        <img src='/assets/newsletter_cover.jpg' alt='' className='w-full h-full object-cover' />
      </div>

    </div>
  )
}

export default Newsletter
