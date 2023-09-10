"use client"

import { useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle } from 'react-icons/fa'
import { ImStarFull, ImStarEmpty } from 'react-icons/im'

interface closeModal {
    closeReviewModal: () => void 
}

const WriteReviewModal = ({ closeReviewModal, handleCreateReview }: {handleCreateReview: any, closeReviewModal: any } ) => {

  const [inputTitle, setinputTitle] = useState<string>(" ")
  const [review, setReview] = useState<string>("")
  const [stars, setStars] = useState<number>(5)


  const [error, setError] = useState<any>(false)



  return (
    <div className='absolute top-[58rem] left-0 flex justify-center items-center w-full h-screen bg-modalBackground'>
        <div className='px-[4%] w-[56%] h-auto bg-grayLightSoft'>
        <h2 className='mt-9 mb-2 text-lg font-medium text-text'> Write a Review </h2>
        <div className='mb-5 w-full h-1 border-b border-b-gray'/>
        
        <form>
            {/* <label className='text-sm text-text' > Title* </label>
            <input 
                type='text'
                placeholder='e.g. Hoodsie'
                value={ inputTitle }
                onChange={ e => setinputTitle(e.target.value) } 
                className='pl-4 w-full h-9 m-1 border border-grayLight placeholder:text-sm placeholder:text-gray'
            /> */}
            <p className='m-2 text-sm text-text'> Your review* </p>
            <textarea placeholder={error ? error.message : ''} value={ review } onChange={ (e) => {
                setError(false)
                setReview(e.target.value)} }  className={` pl-4 pt-2 w-full ${error ? 'border-red-500 placeholder:text-red-500 placeholder:text-sm': 'border-grayLight'} bg-white text-grayDark border `}  cols={ 5 } > </textarea>

            <div className='my-7'>
                <p className='mb-1 text-sm text-text'> Rate this product </p>
                <div className="flex gap-1 ">
                    <IconContext.Provider value={{ className:"w-6 h-6 text-text cursor-pointer" }}>
                        
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                            type="button"
                            key={index}
                            onClick={() => setStars(index)}
                            
                            >
                                {index <= (stars) ? <ImStarFull/> : <ImStarEmpty/>}
                            </button>
        );
      })}
                        
                    </IconContext.Provider>
                </div>
            </div>

            

            <div className='flex  mt-8 mb-11 justify-between'>
                <button disabled={error} onClick={async (e)=> {

                    e.preventDefault()
                    console.log(error);
                    
                    setError( await handleCreateReview(review, inputTitle, stars))
                }} className={`rounded-md m-3 w-1/2 h-9 ${error ? 'border border-red-500 text-red-500': 'bg-black'} text-sm text-white`} > Submit </button>
                <button onClick={()=> closeReviewModal()} className='w-1/2 m-3 h-9 bg-black rounded-md text-sm text-white '> Cancel </button>
            </div>
            
        </form>

            
        </div>
    </div>
  )
}

export default WriteReviewModal
