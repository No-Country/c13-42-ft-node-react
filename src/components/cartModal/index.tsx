/* eslint-disable @next/next/no-img-element */
"use client"

import Link from 'next/link'
import { type User } from 'next-auth'
import {  useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle, FaTrash } from "react-icons/fa"

interface functionToggleCart {
    toggleCartModal: () => void,
    user: User|undefined
}
export interface cart {
  
    id: any;
    title: any;
    quantity: any;
    currency_id: string;
    unit_price: any;

}[]

const CartModal = ({ toggleCartModal, user }: functionToggleCart  ) => {

const router = useRouter()




const [url, seturl] = useState<null|string>(null)
const [id, setId] = useState<string>('')
const [items, setItems] = useState([]);
const [products, setProducts] = useState<cart|any>();
const [confimation, setConfirmation] = useState<boolean>(false);


const removeAll = () => {
  const updated: any = []
  setItems(updated)
  setProducts(updated)
  setId('')
  seturl(null)
  localStorage.setItem('cart', JSON.stringify(updated));
}

const removeOne = (id: string) => {
  const updated: any = items.flatMap((item: any)=>{
    if(item.id ===id){
        return []
    }
    return item
  })
  setItems(updated)
  localStorage.setItem('cart', JSON.stringify(updated));
}

  const addCount = (id: string) => {
    const updated: any  = items.map((item: any)=>{
      if(item.id ===id){
        return {...item, quantity: item.quantity+1}
      }
      return item
    })
    setItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated));


  }

  const subtractCount = (id: string) => {
    const updated: any = items.flatMap((item: any)=>{
      if(item.id ===id){
       if (item.quantity == 1) {
          return []
       }
       return {...item, quantity: item.quantity-1}
      }
      return item
    })
    setItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated));
  }



  function getCart() {
      const local = localStorage.getItem('cart') 
      const items = local ?  JSON.parse(local) : []
      if (items) {
          setItems(items);
      }
      return items
    }
  useEffect(() => {
    getCart()
  }, []);



  useEffect(() => {
    
    const getCheckoutUrl = async () => {
        seturl(null)
        setId("")
        const cart = items.flatMap((item: any)=>{
          if (item.quantity === 0 ) {
            return []
          } else {
            return {
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              currency_id: 'USD',
              unit_price: item.price,
            }
          }
        })
        console.log(cart);
        setProducts(cart)
        
        if (user && cart.length > 0) {
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
            body: JSON.stringify({user: user?.email, products: cart}) 
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
  }, [items])


  const handleCreateOrder =async ()=>{
    const cart = products.map((item: any)=>{
      return {id:item.id, quantity: item.quantity}
    })
    const total = products.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.unit_price * currentValue.quantity, 0)
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
        body: JSON.stringify({id: id,userId: user?.id, products: cart, total : total}) 
      });
      response.json().then(data => {
        console.log(data);
        removeAll()
      })
    }

    // handle not user (redirect to login)

  }
  


  return (

    <div className='absolute top-[12.3%] right-[8.7%] z-30 w-[28rem] h-auto bg-white '>

        <div onClick={ toggleCartModal } >
            <IconContext.Provider value={{ className: "absolute top-[2.5%] right-[4.5%] w-4 h-4 cursor-pointer" }}>
                <FaRegTimesCircle/>
            </IconContext.Provider> 
        </div>
        
        {
              items.length <= 0
                ? (
                <p className='my-4 text-sm text-center'> Your cart is empty </p>
            ) : (
                
                <>

                <div className='mx-[4%]'>
                    <p className='mt-2 text-sm font-semibold' > {`Cart ( ${ items.length } ) `} </p>

                    <div className='mt-1 mb-3 border border-grayLightSoft_2'/>

                    { /* Cart Products */ }
                    {
                     
                      items.map((item: any)=>{
                        return (
                          <>
                            <div className='flex justify-between'>

                        <div className='flex'>
                            <img src={item.images ? item.images[0] : 'https://www.freeiconspng.com/img/23485'} alt='product' className='mr-5 w-[8rem] object-contain h-[7rem]'/>
                            <div>
                                <p className='-mt-1 mb-1 mr-3 font-semibold text-text'>{item.name} </p>
                                <p className='text-xs  text-gray'> {item.gender} </p>
                                <p className='text-xs text-gray' > Size: {item.product_type === 'APPAREL' ? 'M' : '6.5'} </p>
                                
                                <div className='mt-2 flex items-center gap-3'>
                                    <div 
                                        className='flex justify-center items-center w-[1.3rem] h-[1.3rem] border border-accentTeal font-semibold text-accentTeal cursor-pointer' 
                                        onClick={ ()=> subtractCount(item.id) }
                                    > - </div>
                                    <div className='flex justify-center items-center w-[1.3rem] h-[1.3rem] text-xs bg-accentTeal text-white'  > { item.quantity } </div>
                                    <div 
                                        className='flex justify-center items-center w-[1.3rem] h-[1.3rem] border border-accentTeal font-semibold text-accentTeal cursor-pointer' 
                                        onClick={ ()=> addCount(item.id) }
                                    > + </div>
                                </div> 
                                
                                <div onClick={()=>removeOne(item.id)} className='hover:text-warning duration-200 flex items-center gap-2 mt-3 text-gray cursor-pointer ' >
                                    <IconContext.Provider value={{ className:"w-3 h-3  hover:text-grayDark" }} >
                                        <FaTrash/>
                                    </IconContext.Provider>
                                    <p className='text-[0.68rem] text-gray' > Remove </p> 
                                </div>
                            </div>
                        </div>

                       <span className=' flex flex-col items-center'>
                       <p className='text-xl font-semibold text-text'> ${item.price * item.quantity} </p> 
                       <p className=' text-sm font-normal text-left  text-text'> {item.quantity > 1 ? `UP:$${item.price}` : null} </p> 
                       </span>
                    </div>

                    <div className='mt-4 mb-2 border border-grayLightSoft_2'/>
                          </>
                        )
                      })
                     

                    }


                    { /*Product Breakdown */}
                    <div className='mb-[0.3rem] flex justify-between'>
                        <p className='text-lg text-gray' > {`Subtotal ( ${ items.length } )` } </p>
                        <p className='text-lg font-semibold text-text'> ${items.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.price * currentValue.quantity, 0)} </p> 
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sm  text-gray' > Shipping </p>
                        <p className='text-xs font-semibold text-text' > FREE </p> 
                    </div>
                    {
                      confimation
                      ?
                      <div className=' flex flex-col items-center'>
                        <p className='text-grayDark text-sm'>This will take you to a payment site</p>
                        <span className='flex items-start justify-between w-full'>
                        <button disabled={!url} onClick={(e) => {
                        if (url) {
                            try {
                                e.preventDefault()
                                router.push(url)
                                handleCreateOrder()
                            } catch (error) {
                                console.log(error);
                                
                            }
                        }
                    }} className={`mt-4 mb-5 m-1 w-[100%] h-11  ${!url ? 'bg-gray': 'bg-blackZinc'}  text-sm text-white`}>
                        Go
                    </button>
                    <button onClick={(e) => {setConfirmation(false)}} className={`mt-4 mb-5 w-[100%] h-11 m-1  ${!url ? 'bg-gray': 'bg-blackZinc'}  text-sm text-white`}>
                        Cancel
                    </button>
                        </span>
                      </div>
                      :

                      <span className='flex justify-between'>

                      <button disabled={!url} onClick={(e) => {
                        setConfirmation(true)
                    }} className={`mt-4 mb-5 w-2/3 h-11  ${!url ? 'bg-gray': 'bg-blackZinc'}  text-sm text-white`}>
                        Checkout
                        </button>
                        <Link href="/cart" className=' w-1/3 flex items-center justify-center'>
                        <button  className={`mt-4 mb-5  h-11 m-1 p-1  bg-white border-blackZinc  border text-sm text-blackZinc`}>
                          { `See all items ( ${items.length} )` }
                        </button>
                 
                        </Link>    
                
                      
                      </span>

                    }
                    
                </div>

                
                </>
            )
        }
       
    </div>
  )
}

export default CartModal
