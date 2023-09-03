/* eslint-disable @next/next/no-img-element */
"use client"

import { type User } from 'next-auth'
import Link from 'next/link'
import {  useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle, FaTrash } from "react-icons/fa"
import { useCartContext } from '~/hooks/useCartContext'

interface functionToggleCart {
    toggleCartModal: () => void,
    user: User|undefined
}

const CartModal = ({ toggleCartModal, user }: functionToggleCart  ) => {

const router = useRouter()
const { fullCart } = useCartContext()


const [cart, setCart] = useState<number>(2)
const [cartCount, setCartCount] = useState<number>(1)  

const [url, seturl] = useState<null|string>(null)
const [id, setId] = useState<string>('')


  
  const addCount = () => {
    setCartCount( prev => prev  + 1 )
  }

  const subtractCount = () => {
    if(cartCount <= 1 ) return
    setCartCount( prev => prev - 1 )
  }

  useEffect(() => {
    const getCheckoutUrl = async () => {
        const products = [
              {
                id:'2e6701f7-951f-5907-ad5e-90d7266f3e0e',
                title: 'Justin Fields Chicago Bears',
                quantity: 1,
                currency_id: 'USD',
                unit_price: 175,
              }
            ]
        if (user) {
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
            // products: [
            //   {
            //     id:'1234',
            //     title: 'Test',
            //     quantity: 1,
            //     currency_id: 'USD',
            //     unit_price: 10.5
            //   }
            // ],
            body: JSON.stringify({user: user?.email, products: products}) 
          });
          response.json().then(data => {
            console.log(data);
            seturl(data.url)
            setId(data.id)
          }).catch((error) => {
            console.log(error)
            seturl(null) 
        })
        } 
        // handle not user (redirect to login)

    }

    getCheckoutUrl()
    
  }, [cart])


  const handleCreateOrder =async ()=>{
    if (user) {
        const response = await fetch(`http://localhost:3000/api/v0/orders`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        // products in cart [{id: '2e6701f7-951f-5907-ad5e-90d7266f3e0e'}, ...]
        body: JSON.stringify({id: id,userId: user?.id, products: [{id: '2e6701f7-951f-5907-ad5e-90d7266f3e0e'},], total : 100}) 
      });
      response.json().then(data => {
        console.log(data);
        
      }).catch((error) => {
        console.log(error)
    })
    }

    // handle not user (redirect to login)

  }
  

  return (
    <div className='absolute top-[20%] right-[12%] z-30 w-[24rem] h-auto bg-white border border-grayLight shadow-xl'>
        <div onClick={ toggleCartModal } >
            <IconContext.Provider value={{ className: "absolute top-[2.5%] right-[4.5%] w-4 h-4 cursor-pointer" }}>
                <FaRegTimesCircle/>
            </IconContext.Provider> 
        </div>
        
        {
            !fullCart || fullCart.length == 0  ? (
                  <p className='my-4 text-sm text-center'> Your cart is empty </p>  

            ) : (
                
                <>
                <div className='mx-[4%]'>
                    <p className='mt-2 text-sm font-semibold' > {`Cart ( ${ fullCart.length } ) `} </p>

                    <div className='mt-1 mb-3 border border-grayLightSoft_2'/>

                    { /* Cart Products */ }
                    <div className='flex justify-between'>
                      {
                        fullCart.map( item => (
                          <div className='flex' key={ item.id }>
                            <img src={ item?.images ? item?.images[0] : "/assets/no_image.svg" } alt='product' className='mr-5 w-[5rem] h-[7rem]'/>
                            <div>
                                <p className='-mt-1 mb-1 font-semibold text-text'> { item.name } </p>
                                <p className='text-[0.68rem] text-gray uppercase'> {`${ item.gender} | ${ item.category } ` } </p>
                                <p className='text-xs text-gray' > { item.brand } </p>
                                
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
                                
                                <div 
                                  className='flex items-center gap-2 mt-3 text-gray cursor-pointer' 
                                  
                                >
                                    <IconContext.Provider value={{ className:"w-3 h-3  hover:text-grayDark" }} >
                                        <FaTrash/>
                                    </IconContext.Provider>
                                    <p className='text-[0.68rem] text-gray' > Remove </p> 
                                </div>
                            </div>
                        </div>
                        ))
                        .slice(0,1)  
                      }
                        <p className='text-sm font-semibold text-text'> PRICE </p> 
                    </div>

                    <div className='mt-4 mb-2 border border-grayLightSoft_2'/>


                    { /*Product Breakdown */}
                    <div className='mb-[0.3rem] flex justify-between'>
                        <p className='text-sm text-gray' > {`Subtotal ( ${ cart } )` } </p>
                        <p className='text-sm font-semibold text-text'> PRICE </p> 
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sm  text-gray' > Shipping </p>
                        <p className='text-xs font-semibold text-text uppercase' > FREE </p> 
                    </div>

                    <button disabled={!url} onClick={(e) => {
                        if (url) {
                            try {
                                e.preventDefault()
                                router.push(url)
                                handleCreateOrder()
                            } catch (error) {
                                
                            }
                        }
                    }} className={`mt-4 mb-5 w-[100%] h-11  ${!url ? 'bg-gray': 'bg-blackZinc'}  text-sm text-white cursor-pointer`}>
                        Checkout
                    </button>
                </div>

             
                <Link href="/cart">
                  <button className='w-full h-11 bg-white text-sm text-text border-t border-t-grayLight shadow-inner ' >
                      { `See all items( ${fullCart.length} )` }
                    </button>
                </Link>               
                </>
            )
        }
    </div>
    
  )
}

export default CartModal
