/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from 'react'
import ProductSmallModal from '../productSmallModal'

export interface outfit {
    id: string,
    userTag: string,
    userImage: string,
    productInfo: {
        id: string,
        productName: string,
        productImage: string
    }
}

const ShareYourOutfit= () => {

  const [isShownModal, setIsShownModal] = useState<number>(-1)
  
  const outfits: outfit[] = [
    {
      id: "1",
      userTag: "@fabianna98",
      userImage: "/assets/user_5.jpg",
      productInfo: {
          id: "red_jacket",
          productName: "Red Hoody",
          productImage: "/assets/user_5.jpg"
      } 
    },

    {
      id: "2",
      userTag: "@carlos$",
      userImage: "/assets/user_2.jpg",
      productInfo: {
          id: "black_carbon_air",
          productName: "Black Carbon Air",
          productImage: "/assets/product_2.jpg"
      } 
    },

    {
      id: "3",
      userTag: "@el_marshmellow",
      userImage: "/assets/user_3.jpg",
      productInfo: {
          id: "gravity_sneakers",
          productName: "Gravity Sneakers",
          productImage: "/assets/product_3.jpg"
      } 
    },

    {
      id: "4",
      userTag: "@hello_sussy",
      userImage: "/assets/user_6.jpg",
      productInfo: {
          id: "strawberry_rocket",
          productName: "Strawberry Rocket",
          productImage: "/assets/product_4.jpg"
      } 
    }
  ]  

  return (

    <div className='relative w-full h-[100%] bg-darkBackground text-white'>
      <div >
        <h2 className='pt-9 text-3xl font-medium text-center sm:pt-12' > Hoodsy Community </h2>
        <p className='mt-3 mx-[13%] text-sm text-center leading-7 sm:text-base' > Share your unique style using the hashtag <span className='font-semibold'> #hoodycommunity </span>. Every week we choose the most trendy outfits from our social media. Try it and you can get discounts and special rewards. </p>
      </div>

      <div className='flex flex-col items-center mt-12 mx-[8%] sm:flex sm:flex-row sm:flex-wrap sm:justify-between sm:mt-24'  >
        { 
          outfits.map( (outfit, index) => (
            <div 
              key={ outfit.id }
              onMouseEnter={() => setIsShownModal(index) }
              onMouseLeave={() => setIsShownModal(-1) }
              className="relative"
            > 
              <img src={ outfit.userImage } alt='user tag' className='w-[9rem] h-[16rem] object-cover rounded-sm sm:w-[12rem] lg:w-[13rem] 
              md:mb-0 sm:h-[18rem] '/>
              <p className='mt-2 pb-14 text-sm font-medium text-center md:mb-0 '> { outfit.userTag } </p> 

              {
                isShownModal === index && (
                  <ProductSmallModal
                  outfit={ outfit }   
                />
                )
              }
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default ShareYourOutfit
