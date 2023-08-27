/* eslint-disable @next/next/no-img-element */
'use client'

import { Product } from '@prisma/client'
import React from 'react'
import Link from 'next/link'
import {  type Clothing } from '~/pages'

interface ProductCard {
    product: Clothing                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}


const ProductCard = ({ product }: {product: Product} ) => {

    function spaNavigate(data) {
        // Fallback for browsers that don't support this API:
        if (!document.startViewTransition) {
          updateTheDOMSomehow(data);
          return;
        }
      
        // With a transition:
        document.startViewTransition(() => updateTheDOMSomehow(data));
      }

  return (


    <Link href={`/products/${product.id}`} className='justify-center items-center flex' onClick={spaNavigate}>
        <div className='h-auto border-grayLight rounded-md bg-whiteLight p-4'>
            <div className=''>
                
                <img src={ product.images[0] } alt='producto' className='h-full rounded-t-md'/>
            </div>

            <div key={ product.id } className='mx-[5%] mt-5' >
                <h3 className='text-xs  text-stone-400 uppercase'> { product.brand }</h3>
                
                <p className='mb-1 font-bold  text-text h-24'> { product.name } </p>
                <p className='mb-4 text-xl font-light'> {`$${product.price}` } </p>
                <div className='flex justify-center items-center'>
                    <button className='w-28 h-9 bg-darkBackground text-sm text-white rounded-md'> Add to cart </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard
