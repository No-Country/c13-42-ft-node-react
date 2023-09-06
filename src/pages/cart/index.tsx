/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import ProductCounter from '~/components/productCounter'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaLongArrowAltLeft,  FaTrash } from "react-icons/fa"
import Navbar from '~/components/navbar'
import { BsArrow90DegLeft, BsArrowLeft } from 'react-icons/bs'
import { cart } from '~/components/cartModal'
import {  useSession } from 'next-auth/react'
import { useRouter } from 'next/router'



const Cart = () => {

  const router = useRouter()

  const [url, seturl] = useState<null|string>(null)
  const [id, setId] = useState<string>('')
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState<cart|any>();
  const [confimation, setConfirmation] = useState<boolean>(false);
  const { data: session , status } = useSession()
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const local = localStorage.getItem('cart') 
    const items = local ?  JSON.parse(local) : []
    if (items) {
     setItems(items);
    }
  }, []);

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
    const sum = cart.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.unit_price * currentValue.quantity, 0)
  setTotal(sum)
    console.log(cart);
    setProducts(cart)
    
    if (session?.user && cart.length > 0) {
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
        body: JSON.stringify({user: session.user?.email, products: cart}) 
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

  useEffect(() => {
    getCheckoutUrl()
  }, [items])


  const handleCreateOrder =async ()=>{
    const cart = products.map((item: any)=>{
      return {id:item.id, quantity: item.quantity}
    })
    const sum = products.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.unit_price * currentValue.quantity, 0)
    console.log(sum);
    
    setTotal(sum)
    if (session?.user) {
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
        body: JSON.stringify({id: id,userId: session.user?.id, products: cart, total : sum}) 
      });
      response.json().then(data => {
        console.log(data);
        removeAll()
      }).catch((error) => {
        console.log(error)
    })
    }

    // handle not user (redirect to login)

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
  const removeAll = () => {
    const updated: any = []
    setItems(updated)
    setProducts(updated)
    setId('')
    seturl(null)
    localStorage.setItem('cart', JSON.stringify(updated));
  }

  


  return (

    <>
      
      <div className='mx-[5%] mb-12'>
      <span className=' flex items-center'>
      <Link className='mt-11 mb-6 mr-3 text-xl font-semibold text-text hover:underline' href={'/'}> <BsArrowLeft/></Link>
      <h2 className='mt-11 mb-6 text-xl font-semibold text-text' > Cart Shopping </h2>
      </span>

      
      <div className='flex w-full'>
        <div className='mr-14 w-[66%]'>
            <div className='flex justify-between mb-5 py-3 w-full h-auto border-b border-b-grayLight '>
                <p className='font-semibold' > Items {items.length} </p>
                <button className='text-sm font-medium text-warning' onClick={removeAll}> Remove all </button>
            </div>

            { /*Product Detail */ }
            {
              items.length > 0
              ?
              items.map((item:any)=>{
                return (
                  <div className='flex justify-evenly items-center pb-6 border-b border-b-grayLight ' >
                    <Link className='mt-2' href={`/products/${item.id}`}>
                    <img src={item.images ? item.images[0] : 'https://www.freeiconspng.com/img/23485'} alt='product' className='w-full h-36 object-contain'/>

                    </Link>
                <div className='flex justify-start' >  
                    
                    <div className='flex-col w-full' >
                      <Link href={`/products/${item.id}`}>
                      <p className='mb-1 text-ellipsis whitespace-nowrap w-[17rem] overflow-hidden text-xl font-semibold text-text' > {item.name} </p>

                      </Link>
                        <p className='text-sm font-medium text-grayDark' > {item.gender} | {item.product_type} </p>
                        <p className='mb-2 text-sm font-medium text-grayDark' > Size: {item.product_type === 'APPAREL' ? 'M' : '6.5'} </p>
                        <div onClick={()=>removeOne(item.id)} className='flex items-center gap-3 hover:text-warning duration-200'  >
                            <IconContext.Provider  value={{ className:"w-3 h-3 text-gray-400 cursor-pointer hover:text-grayDark " }} >
                                <FaTrash />
                            </IconContext.Provider>
                            <p className='text-sm font-medium text-text' > Remove </p>
                        </div>   
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                <p className='text-lg font-semibold text-text' > ${ item.price * item.quantity} </p>
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
                </div>
             
            </div>
                )
              })
              :
              <p>No products in cart</p>
            }

            { /*Continue Shopping */ }
              <Link href="/" className='flex items-center mt-4 gap-3' >  
                <IconContext.Provider value={{ className:"w-5 h-5" }}>
                  <FaLongArrowAltLeft />
                </IconContext.Provider>
                <p className='text-sm text-text' > Continue Shopping </p>
              </Link> 
        </div>


        { /*Product Summary */ }
        <div className='px-4 pb-5 w-[30%] h-auto bg-grayLightSoft_2 '>
            <div className='mb-8 pt-3 pb-2 border-b border-b-grayLight' >
              <p className='font-semibold'> Product Summary </p>
            </div>

            <div className='flex justify-between'>
              <p className='text-grayDark'> Subtotal </p>
              <p className='font-semibold '> ${total} </p>
            </div>

            <div className='my-[0.65rem] w-full border-b border-b-grayLight' />

            <div className='flex justify-between'>
              <p className='text-grayDark' > Shipping </p>
              <p className='font-semibold '> FREE </p>
            </div>

            <div className='my-[0.65rem] w-full border-b border-b-grayLight' />

            <div className='flex justify-between mb-7'>
              <p className='font-semibold' > Total </p>
              <p className='font-semibold '> ${total} </p>
            </div>

            {
              confimation
              ?
              <>
              <p className='text-center font-light underline underline-offset-2'>This will take you to a payment site</p>
                <div className='flex items-center justify-between'>
                
                <button  disabled={!url} onClick={(e) => {
                if (url) {
                    try {
                        e.preventDefault()
                        router.push(url)
                        handleCreateOrder()
                    } catch (error) {
                        console.log(error);
                        
                    }
                }
            }} className={` mb-8 m-1 w-[100%] h-12  ${!url ? 'bg-gray': 'bg-darkBackground'}  text-sm text-white`}>
              Go!
            </button>
            <button onClick={()=>setConfirmation(false)} className='mb-8 m-1 w-full h-12 border-darkBackground bg-white border text-darkBackground '>
                Cancel
                </button>
              </div>
              </>
              
              :
              <button onClick={()=>{
                getCheckoutUrl()
                setConfirmation(true)}} className='mb-8 w-full h-12 bg-darkBackground text-white '>
                Checkout
              </button>
              
            }

            <p className='text-sm leading-3'> Payment method </p> 

            <div className='mb-3 flex items-center gap-3'>
              <p className='text-lg font-semibold'>  Mercado Pago </p>
              <img src='/assets/mercado_pago.svg' alt='mercado pago icon' className='w-8 h-8' />
            </div>

            <div>
              <p className='mb-1 text-sm'> Mercado Pago accepts these credit cards </p>
              <div className='flex items-center gap-5'>
                <img src='/assets/visa.svg' alt='visa logo' className='w-8 h-8'/>
                <img src='/assets/mastercard.svg' alt='mastercard logo' className='w-8 h-8'/>
              </div>

            </div>
        </div>
      </div>

          
    </div>
    </>
  )
}

export default Cart
