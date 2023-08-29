"use client"
import {  type Dispatch, type SetStateAction } from "react"

interface counter {
    cartCount: number,
    setCartCount: Dispatch<SetStateAction<number>>
}


const ProductCounter = ({ cartCount, setCartCount}: counter ) => {

  const addCount = () => {
    setCartCount( prev => prev  + 1 )
  }
    
  const subtractCount = () => {
    if(cartCount <= 1 ) return
    setCartCount( prev => prev - 1 )
   }  

  return (

    <div className='mt-2 flex gap-3'>
        <div 
            className='flex justify-center items-center w-[2rem] h-[2rem] border border-accentTeal text-xl font-semibold text-accentTeal cursor-pointer' 
            onClick={ subtractCount }
        > - </div>

        <div className='flex justify-center items-center w-[2rem] h-[2rem] text-sm bg-accentTeal text-white'> 
            { cartCount } 
        </div>
                                    
        <div 
            className='flex justify-center items-center w-[2rem] h-[2rem] border border-accentTeal text-xl font-semibold text-accentTeal cursor-pointer' 
            onClick={ addCount }
        > + </div>
    </div>
    
  )
}

export default ProductCounter
