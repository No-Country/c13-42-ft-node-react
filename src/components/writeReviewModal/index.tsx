"use client"

import { useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle } from 'react-icons/fa'
import { ImStarFull } from 'react-icons/im'

interface closeModal {
    closeReviewModal: () => void 
}

const WriteReviewModal = ({ closeReviewModal }: closeModal ) => {

  const [inputName, setInputName] = useState<string>("")

  return (
    <div className='absolute top-[58rem] left-0 flex justify-center items-center w-full h-screen bg-modalBackground'>
        <div className='px-[4%] w-[56%] h-auto bg-grayLightSoft'>
        <h2 className='mt-9 mb-2 text-lg font-medium text-text'> Write a Review </h2>
        <div className='mb-5 w-full h-1 border-b border-b-gray'/>

        <form>
            <label className='text-sm text-text' > Name* </label>
            <input 
                type='text'
                placeholder='e.g. Hoodsie'
                value={ inputName }
                onChange={ e => setInputName(e.target.value) } 
                className='pl-4 w-full h-9 border border-grayLight placeholder:text-sm placeholder:text-gray'
            />

            <div className='my-7'>
                <p className='mb-1 text-sm text-text'> Rate this product </p>
                <div className="flex gap-1 ">
                    <IconContext.Provider value={{ className:"w-6 h-6 text-text cursor-pointer" }}>
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                        <ImStarFull />
                    </IconContext.Provider>
                </div>
            </div>

            <p className='mb-2 text-sm text-text'> Your review* </p>
            <textarea className='mb-1 pl-4 pt-2 w-full bg-white text-grayDark border border-grayLight' cols={ 5 } > </textarea>
            <p className='text-[0.65rem]'> *All fields are required </p>

            <div className='flex justify-center mt-8 mb-11'>
                <button className='w-full h-9 bg-black text-sm text-white '> Submit </button>
            </div>
        </form>

            <div onClick={ closeReviewModal }>
                <IconContext.Provider value={{ className:"absolute top-[7rem] right-[26%] w-5 h-5 cursor-pointer" }}>
                    <FaRegTimesCircle/>
                </IconContext.Provider>
            </div>
        </div>
    </div>
  )
}

export default WriteReviewModal
