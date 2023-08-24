/* eslint-disable @next/next/no-img-element */
"use client"

import { IconContext } from "react-icons"
import { FaTruck } from "react-icons/fa"
import { HiOutlineReceiptRefund } from "react-icons/hi"

const ProductDetail = () => {

  return (

    <div className=' flex justify-between mt-20 ml-[10%] mr-[4%] h-auto'>
      <div className="w-[50%]" >
        <img src='/assets/clothing_2.jpg' alt='' className='w-[70%] h-[24rem]'/>
      </div>

      <div className="w-[42%]">
        <p className="mt-6 mb-1 text-sm font-medium text-text" > Man | Sneakers </p>
        <h2 className="mb-2 text-3xl font-semibold text-text"> Air Black   </h2>
        <p className="mb-8 text-xl font-medium text-text" > $30</p>

       
        <div className="flex items-center mb-3 " >
          <IconContext.Provider value={{ className:"mr-3 w-5 h-5" }} >
            <FaTruck />
          </IconContext.Provider>
          <p className="text-text"> Free shipping on purchases over $25 </p>
        </div>

        <div className="flex items-center" >
          <IconContext.Provider value={{ className:"mr-3 w-5 h-5" }} >
            <HiOutlineReceiptRefund />
          </IconContext.Provider>
          <p className=" text-text"> Free returns and refund </p>
        </div>

        <button className="mt-10  w-56 h-14 bg-darkBackground text-white rounded-md cursor-pointer"> 
          Add to cart 
        </button>

      </div>
      
     
        
            
       

        
      
    </div>
  )
}

export default ProductDetail
