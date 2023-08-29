/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'
import { type outfit } from '../shareYourOutfit'
import { IconContext } from 'react-icons'
import { FaRegHeart  } from "react-icons/fa"
import { FcLike } from "react-icons/fc"

interface smallModal {
    outfit: outfit
}


const ProductSmallModal = ({ outfit }: smallModal ) => {

  const [liked, setLiked] = useState<boolean>(false)  

  return (

    <div className='absolute top-[-6%] left-[-10%] flex gap-2 items-center px-[5%] w-[9.2rem] h-20 bg-white text-text rounded-md'>
        <img src={ outfit.productInfo.productImage }  alt={ outfit.productInfo.productName } className=' w-7 h-7 object-cover ' />
        <div>
            <p className='text-xs font-semibold text-text' > { outfit.productInfo.productName.substring(0, 12) + "..." } </p>
            <div className='flex gap-2 mt-2'>
                <button className='w-14 h-5 text-[0.55rem] font-light bg-darkBackground text-white  ' >
                    See more
                </button>

                <button onClick={() => setLiked(!liked) } className='flex justify-center items-center w-5 h-5 border border-grayLight' >
                    <IconContext.Provider value={{ className: "w-[0.6rem] h-[0.6rem]" }} >
                        { liked ? <FcLike /> : <FaRegHeart />}
                    </IconContext.Provider>
                </button>

            </div>
        </div>        
    </div>
  )
}

export default ProductSmallModal
