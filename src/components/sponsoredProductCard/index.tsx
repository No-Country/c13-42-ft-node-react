/* eslint-disable @next/next/no-img-element */
import React from 'react'

const SponsoredProductCard = () => {
  return (
    <div className="w-full h-auto">
            <h2 className="mt-6 mb-2 text-xs text-text uppercase"> Sponsored </h2> 
            <img src="/assets/sponsored_product.jpg" alt="sponsored product" className="w-[52%] h-[16rem] object-cover" />
            <div className="pl-[2%] w-[52%] h-auto bg-darkBackground text-grayLightSoft ">
                <p className="pt-3 text-[0.65rem] font-semibold uppercase"> Light up the street  </p>
                <p className="text-lg font-semibold"> Nike Shoes - Neon Jungle</p>
                <button className="mt-3 mb-5 w-[40%] h-9 bg-accent3 text-sm font-semibold text-white"> See more </button>
            </div>
    </div>  
  )
}

export default SponsoredProductCard
