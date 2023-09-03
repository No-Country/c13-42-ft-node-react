/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import ProductCounter from '~/components/productCounter'
import Link from 'next/link'
import { IconContext } from 'react-icons'
import { FaLongArrowAltLeft,  FaTrash } from "react-icons/fa"
import { useCartContext } from '~/hooks/useCartContext'


const Cart = () => {

  const { fullCart, emptyCart } = useCartContext()
  
  
  return (
    <>
      { 
        fullCart.length == 0 ?  (
          <div className='w-full h-screen flex flex-col justify-center items-center ' >
            <img src='/assets/empty_cart_5.svg' alt='no items in the cart' className='w-[13rem] h-[14rem]'/>
            <h2 className='mt-6 text-2xl font-semibold text-text'> You cart is empty </h2>
            <p className='mt-1 text-lg font-medium text-text'> Check our store and start browsing hundreds of products.</p>
            <p className='text-lg font-medium text-text'> There will always be something for you </p>
            <Link href="/">
              <button className='mt-7 w-60 h-12 bg-darkBackground text-white'> Back to Home   </button>
            </Link> 
          </div>

        ) : (

          <div className='mx-[5%] mb-12'>
            <h2 className='mt-11 mb-6 text-xl font-semibold text-text' > Cart Shopping </h2>

            <div className='flex w-full'>
              <div className='mr-14 w-[66%]'>
                <div className='flex justify-between mb-5 py-3 w-full h-auto border-b border-b-grayLight '>
                  <p className='font-semibold' > {`Items ( ${ fullCart.length } )` } </p>
                  <button 
                    className='text-sm font-medium text-warning' 
                    onClick={ emptyCart }
                  > Remove all </button>
                </div>

              { /*Product Detail */ }
              {
                fullCart.map( cartItem => (
                 
                  <div className='flex justify-between pb-6 border-b border-b-grayLight' key={ cartItem.id } >
                    <div className='flex gap-6' >  
                      <img src={ cartItem.images ? cartItem?.images[0] : "/assets/no_image.svg" } alt='product' className='w-24 h-28 object-cover'/>
                      <div className='flex-col' >
                        <p className='mb-1 text-lg font-semibold text-text' > { cartItem.name } </p>
                        <p className='text-sm font-medium text-grayDark uppercase'> { `${ cartItem.gender } | ${ cartItem.category } ` } </p>
                        <p className='text-sm font-medium text-grayDark' > { cartItem.brand } </p>
                        <p className='mb-3 font-medium text-text' > { `$${ cartItem.price }` } </p>
                        <div className='flex items-center gap-3' >
                            <IconContext.Provider value={{ className:"w-3 h-3 text-gray-400 cursor-pointer hover:text-grayDark " }} >
                                <FaTrash />
                            </IconContext.Provider>
                            <p className='text-sm font-medium text-text' > Remove </p>
                        </div>   
                      </div>
                    </div>

                    { /*
                        <ProductCounter 
                          cartCount={ cartCount }
                          setCartCount={ setCartCount }
                        />  
                    */}
                  
                    <div>
                      <p className='mb-1 text-sm font-medium text-grayDark'> Sum  </p>
                      <p className='text-lg font-semibold text-text' > PRICE </p>  
                    </div>
                  </div>
                ))
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
                <p className='font-semibold '> $60.50 </p>
              </div>

              <div className='my-[0.65rem] w-full border-b border-b-grayLight' />

              <div className='flex justify-between'>
                <p className='text-grayDark' > Shipping </p>
                <p className='font-semibold uppercase'> FREE </p>
              </div>

              <div className='my-[0.65rem] w-full border-b border-b-grayLight' />

              <div className='flex justify-between mb-7'>
                <p className='font-semibold' > Total </p>
                <p className='font-semibold '> $60.50 </p>
              </div>

              <button className='mb-8 w-full h-12 bg-darkBackground text-white '>
                Checkout
              </button>

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
        )
      }
    </>
  )
}

export default Cart
