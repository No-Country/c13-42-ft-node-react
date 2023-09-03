/* eslint-disable @next/next/no-img-element */
'use client'

import { type Product } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {  type Clothing } from '~/pages' 
import { useCartContext } from '~/hooks/useCartContext'

interface ProductCard {
    product: Clothing
}


const ProductCard = ({ product }: {product: Product} ) => {
 

const { fullCart, setFullCart } = useCartContext()    
const [imgLoad, setImgLoad] = useState<boolean>(false)
const [showElement, setShowElement] = useState<boolean>(false)
const loadImage = () => {
    setImgLoad(true)
}

useEffect(() => {
    const timer = setTimeout(() => {
        setShowElement(true);
      }, 2000);  
      return () => clearTimeout(timer);   
    
}, [])
  return (

    <Link href={`/products/${product.id}`} className='justify-center items-center flex border-[1px] border-white hover:border-[1px] hover:border-black hover:rounded-md ease-in-out'>
        <div className={`${(showElement) ? 'scale-100':'scale-[1.05]'} h-full w-full border-grayLight rounded-md bg-loadingImg p-4`}>
            <picture className='relative'>
                <source
                srcSet={product.images[0]}
                type="image/webp"
                />
                
                <img ref= {(img) => { 
                    if (img?.complete) { 
                        loadImage()
                    }
                    }} 
                    src={ product.images[0] } 
                    alt='producto' onLoad={loadImage} 
                    loading='lazy' 
                    className='w-[250px] h-[216px] rounded-t-md'/>
                {(imgLoad && showElement)?null:<div className="w-full h-full top-0 absolute h-full bg-loadingImg"></div>}

            </picture>

            <div key={ product.id } className='mx-[5%] mt-5' >
                <h3 className='text-xs  text-stone-400 uppercase'> { product.brand } </h3>
                <p className='mb-1 font-bold  text-text h-20'> { product.name } </p>
                <p className='mb-4 text-xl font-light'> {`$${product.price}` } </p>
                <div className='flex justify-center items-center'>
                    <button 
                        className='z-30 w-28 h-9 bg-gray text-sm text-white hover:bg-darkBackground rounded-md'
                        onClick={ () => 
                            setFullCart(
                                {
                                        id: product?.id,
                                        name: product?.name,
                                        category: product?.category,
                                        price: product?.price,
                                        brand: product?.brand,
                                        gender: product?.gender,
                                        images: product?.images,
                                        sub_title: product?.sub_title
                                }
                                
                            )
                            
                        }    
                    > Add to cart </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard
