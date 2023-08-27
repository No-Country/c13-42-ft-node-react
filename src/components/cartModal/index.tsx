/* eslint-disable @next/next/no-img-element */
"use client"

import { redirect } from 'next/dist/server/api-utils'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle, FaTrash } from "react-icons/fa"
import { getCheckoutUrl } from '~/utils/checkout'

interface functionToggleCart {
    toggleCartModal: () => void
}

const CartModal = ({ toggleCartModal }: functionToggleCart  ) => {

    const router = useRouter()


  const [cart, setCart] = useState<number>(2)
  const [cartCount, setCartCount] = useState<number>(1)  

    const [url, seturl] = useState<null|string>(null)
  
  const addCount = () => {
    setCartCount( prev => prev  + 1 )
  }

  const subtractCount = () => {
    if(cartCount <= 1 ) return
    setCartCount( prev => prev - 1 )
  }

  useEffect(() => {
    const getCheckoutUrl = async () => {
        const response = await fetch(`http://localhost:3000/api/v0/checkout`, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({user: 'hola', products: 'sda'}) 
          });
          response.json().then(data => {
            console.log(data);
            seturl(data.url)
          }).catch((error) => {
            console.log(error)
            seturl(null) 
        })
    }

    getCheckoutUrl()
    
  }, [cart])
  


  return (

    <div className='absolute top-[12.3%] right-[8.7%] z-30 w-[24rem] h-auto bg-white '>

        <div onClick={ toggleCartModal } >
            <IconContext.Provider value={{ className: "absolute top-[2.5%] right-[4.5%] w-4 h-4 cursor-pointer" }}>
                <FaRegTimesCircle/>
            </IconContext.Provider> 
        </div>
        
        {
            cart == 0 ? (
                <p className='my-4 text-sm text-center'> Your cart is empty </p>
            ) : (
                
                <>

                <div className='mx-[4%]'>
                    <p className='mt-2 text-sm font-semibold' > {`Cart ( ${ cart } ) `} </p>

                    <div className='mt-1 mb-3 border border-grayLightSoft_2'/>

                    { /* Cart Products */ }
                    <div className='flex justify-between'>

                        <div className='flex'>
                            <img src='/assets/clothing_2.jpg' alt='product' className='mr-5 w-[5rem] h-[7rem]'/>
                            <div>
                                <p className='-mt-1 mb-1 font-semibold text-text'> Black Carbon </p>
                                <p className='text-xs  text-gray'> Men´s sneakers </p>
                                <p className='text-xs text-gray' > Size 6.5 </p>
                                
                                <div className='mt-2 flex items-center gap-3'>
                                    <div 
                                        className='flex justify-center items-center w-[1.3rem] h-[1.3rem] border border-accentTeal font-semibold text-accentTeal cursor-pointer' 
                                        onClick={ subtractCount }
                                    > - </div>
                                    <div className='flex justify-center items-center w-[1.3rem] h-[1.3rem] text-xs bg-accentTeal text-white'  > { cartCount } </div>
                                    <div 
                                        className='flex justify-center items-center w-[1.3rem] h-[1.3rem] border border-accentTeal font-semibold text-accentTeal cursor-pointer' 
                                        onClick={ addCount }
                                    > + </div>
                                </div> 
                                
                                <div className='flex items-center gap-2 mt-3 text-gray cursor-pointer ' >
                                    <IconContext.Provider value={{ className:"w-3 h-3  hover:text-grayDark" }} >
                                        <FaTrash/>
                                    </IconContext.Provider>
                                    <p className='text-[0.68rem] text-gray' > Remove </p> 
                                </div>
                            </div>
                        </div>

                        <p className='text-sm font-semibold text-text'> $24.25 </p> 
                    </div>

                    <div className='mt-4 mb-2 border border-grayLightSoft_2'/>


                    { /*Product Breakdown */}
                    <div className='mb-[0.3rem] flex justify-between'>
                        <p className='text-sm text-gray' > {`Subtotal ( ${ cart } )` } </p>
                        <p className='text-sm font-semibold text-text'> $60.50 </p> 
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sm  text-gray' > Shipping </p>
                        <p className='text-xs font-semibold text-text' > FREE </p> 
                    </div>

                    <button disabled={!url} onClick={(e) => {
                        e.preventDefault()
                        router.push(url)
                    }} className={`mt-4 mb-5 w-[100%] h-11  ${!url ? 'bg-gray': 'bg-blackZinc'}  text-sm text-white`}>
                        Checkout
                    </button>
                </div>

                <button className='w-full h-11 bg-white text-sm text-text border-t border-t-grayLight shadow-inner ' >
                    { `See all items( ${cart} )` }
                </button>
                </>
            )
        }
       
    </div>
  )
}

export default CartModal
