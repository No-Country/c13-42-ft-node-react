/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {  type Clothing } from '~/pages' 

interface ProductCard {
    product: Clothing
}


const ProductCard = ({ product }: ProductCard ) => {

  return (

    <div className='w-[15rem] h-[26rem] border border-grayLight rounded-md'>
        <div className='w-[15rem] h-[60%]'>
            <img src={ product.image } alt='producto' className='w-full h-full rounded-t-md'/>
        </div>

        <div key={ product.id } className='mx-[5%] mt-5' >
            <h3 className='text-xs  text-stone-400 uppercase'> { product.brand } </h3>
            <p className='mb-1 font-bold  text-text'> { product.name } </p>
            <p className='mb-4 text-xl font-light'> {`$${product.price}` } </p>
            <div className='flex justify-center items-center'>
                <button className='w-28 h-9 bg-darkBackground text-sm text-white rounded-md'> Comprar </button>
            </div>
        </div>
          
    </div>
  )
}

export default ProductCard
