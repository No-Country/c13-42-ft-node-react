/* eslint-disable @next/next/no-img-element */
"use client"

interface bars {
  id: string,
  barRanking: string,
  width: string
}

import { type Product } from "@prisma/client"
import { type GetServerSidePropsContext } from "next"
import { IconContext } from "react-icons"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Navbar from "~/components/navbar"
import { getProductsByID, getProducts } from "~/utils/services/products"
import { useState } from "react"
import { IoReturnDownForwardSharp } from "react-icons/io5"
import { ImStarFull, ImStarHalf } from "react-icons/im"
import ShippingModal from "~/components/shippingModal"
import PaymentModal from "~/components/paymentModal"
import ReturnsModal from "~/components/returnsModal"
import WriteReviewModal from "~/components/writeReviewModal"
import SponsoredProductCard from "~/components/sponsoredProductCard"


const ProductDetail = ({product, products}: {product: Product|null}) => {

  const [questionInput, setQuestionInput] = useState<string>("")
  const [questionArray, setQuestionArray] = useState<number>(1)
  const [reviewArray, setReviewArray] = useState<number>(1)
  const [wishlist, setWishlist] = useState<boolean>(false)

  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false)
  const [isReturnsModalOpen, setIsReturnsModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const closeShippingModal = () => {
    setIsShippingModalOpen(false)
  }

  const closeReturnsModal = () => {
    setIsReturnsModalOpen(false)
  }

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false)
  }

  const closeReviewModal = () => {
    setIsReviewModalOpen(false)
  }

  const sizes: string[] = ["xs", "s", "m", "l", "xl", "xxl"]

  const bars: bars[] = [
    {
      id:"bar_1",
      barRanking: "excellent",
      width: "w-[16rem]"
    },
    {
      id:"bar_2",
      barRanking: "good",
      width: "w-[12rem]"
    },
    {
      id:"bar_3",
      barRanking: "average",
      width: "w-[6rem]"
    },
    {
      id:"bar_4",
      barRanking: "poor",
      width: "w-[2rem]"
    }
  ]

  return (
    <>
    <Navbar products={products}/>
    <div className=' flex justify-between mt-20 ml-[10%] mr-[4%] h-auto'>
      <div className="w-[50%]" >
        <img src={product?.images[0]} alt='' className='w-[70%] h-[24rem] object-contain'/>

        <div>

          { /*FAQ SECTION */ }
          <div className="mt-24 w-full h-auto" >
            <h2 className="mb-5 text-4xl font-medium text-text " > FAQ </h2>
              <h3 className="mb-2 text-xl font-medium text-text"> Topics </h3>
              <div className="flex gap-4" >

                <div 
                  className="flex justify-center items-center  w-auto px-3 h-8 bg-accentTeal cursor-pointer"
                  onClick={ () => setIsShippingModalOpen(true)    }
                >
                  <p className="text-sm  text-text"> Shipping </p>
                </div>

                <div 
                  className="flex justify-center items-center  w-auto px-3 h-8 bg-accentTeal cursor-pointer"
                  onClick={ () => setIsReturnsModalOpen(true)   }
                >
                  <p className="text-sm  text-text"> Returns </p>
                </div>

                <div 
                  className="flex justify-center items-center  w-auto px-3 h-8 bg-accentTeal cursor-pointer"
                  onClick={ () => setIsPaymentModalOpen(true) }
                >
                  <p className="text-sm  text-text"> Payment Methods </p>
                </div>    
              </div>
          </div>


          {/* Ask to seller section */  }
          <div className="mt-8 mb-6 w-[84%] border border-grayLight" />
            <h3 className="mb-2 text-xl font-medium text-text"> Ask to seller  </h3>
            <div className="flex gap-5"  >
              <input 
                className="pl-4 w-[22rem] h-9 border border-gray placeholder:text-sm placeholder:text-gray" 
                placeholder="e.g. Do you have size 5 or 6?"
                value={ questionInput}
                onChange={ e => setQuestionInput(e.target.value) }
              />
              <button 
                className="mb-6  w-[5rem] h-9 bg-darkBackground text-white" 
              > Ask </button>
            </div>

            {
              questionArray == 0 ? (
                <p> No questions founded </p> 
              ) : (
                <div className="mb-4" >
                  <p className="max-w-[84%] text-lg font-semibold text-text" > Do you have the orange color variant? </p>
                    <div className="flex items-start mt-2 ">
                      <IconContext.Provider value={{ className:"mx-3 w-6 h-6" }}>
                        <IoReturnDownForwardSharp/>
                      </IconContext.Provider> 
                      <p className="max-w-[76%] text-sm font-medium"> No, it´s currently out of the stock. Maybe at the end of the year I will have restock of this color </p> 
                    </div>
                </div>
              )
            }

          <div className="my-6 w-[84%] border border-grayLight"/>

          {/*Reviews Section */}
          <div className="relative">
            <h3 className="mb-2 text-xl font-medium text-text"> Reviews </h3>
            <div className="flex gap-7">
              <p className="text-5xl font-medium text-text"> 4.5 </p>
              <div className="flex flex-col" > 
                {
                  bars.map( bar => (
                    <div key={ bar.id } className="flex justify-between items-center gap-3">
                      <div className={`${bar.width} h-[0.4rem] bg-darkBackground `} />
                        <p className="text-xs font-light text-text"> { bar.barRanking } </p>
                      </div>
                  ))
                }
              </div>
            </div>

            {
              reviewArray == 0 ? (
                <>
                  <p className="mt-8 text-sm text-gray-500" > There are not reviews yet. Be the first to comment! </p>
                  <div className="flex justify-center items-center mt-11 mb-14 ">
                    <button 
                      className="w-52 h-10 bg-black text-sm text-white" 
                      onClick={() => setIsReviewModalOpen(true) }
                    > Write a review </button> 
                  </div> 
                </>
              ) : (
                <>
                  <div className="mt-11 flex items-start gap-4">
                    <img src="/assets/kike_user.jpg" alt="user" className="w-10 h-10 object-cover rounded-full"/>
                      <div className="w-[25.5rem]">
                        <p className="-mt-1 mb-1 font-bold text-text"> Kike </p>
                        <div className="flex gap-1">
                          <IconContext.Provider value={{ className:"w-3 h-3 text-text" }}>
                            <ImStarFull />
                            <ImStarFull />
                            <ImStarFull />
                            <ImStarHalf />
                          </IconContext.Provider>
                        </div>
                        <p className="mt-4 mb-1 text-xs text-gray"> one week ago </p>
                        <p className="text-sm text-text leading-5 " > I´m very happy with my purchase. These shoes are super comfortable and easy to clean. Also very resistant. I skate two or three times a week and after this rough use, they have held up pretty well.  </p>
                      </div>
                    </div>

                  <div className="flex justify-center items-center mt-11 mb-14 ">
                    <button 
                      className="w-52 h-10 bg-darkBackground text-sm text-white" 
                      onClick={() => setIsReviewModalOpen(true) }
                    > Write a review </button> 
                  </div> 
                </>                                   
              )
            }
          </div>
        </div>
      </div>


      { /*Right Side - Product Info */ }            
      <div className="w-[42%]">
        <p className="mt-6 mb-1 text-sm font-medium text-text" > {product?.gender} | {product?.product_type} </p>
        <h2 className="mb-2 text-3xl font-semibold text-text"> {product?.name} </h2>
        <p className="my-1 text-sm font-medium text-text" > {product?.sub_title} </p>
        <div className="flex gap-1 mb-3">
            <IconContext.Provider value={{ className:"w-4 h-4 text-text" }}>
                <ImStarFull />
                <ImStarFull />
                <ImStarFull />
                <ImStarFull />
                <ImStarHalf />
            </IconContext.Provider>
        </div>

        <p className="mb-8 text-3xl font-semibold text-text" > ${product?.price}</p>

        <div className="mt-4 flex items-center gap-5">
            <button className="w-56 h-12 bg-darkBackground text-white cursor-pointer"> 
                Add to cart 
            </button>
            <button 
                className={`flex justify-center items-center w-12 h-12 text-xl text-text border border-darkBackground cursor-pointer`} 
                onClick={() => setWishlist(!wishlist) }
            >
                { wishlist ? <FaHeart /> : <FaRegHeart/> }
            </button>
        </div>

        { /*Choose sizes only is visible when categoryApparel is true */}        
        {
          product?.product_type == "APPAREL" && (
            <div className="mt-8">
              <p className="mb-2" > Choose a size </p>
              <div className="flex flex-wrap gap-5  ">
                {
                  sizes.map( (size, index) => (
                    <div key={ index } className="flex justify-center items-center w-14 h-10  border border-black cursor-pointer hover:bg-darkBackground hover:text-white hover:ease-in hover:duration-300" >
                      <p className="text-sm"> { size } </p>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }

        <div className="my-5 w-full border border-grayLight"/>

        { /*Sponsered Product */ }
        <SponsoredProductCard />
      </div>


      { /*Shipping Modal */ }
      {
        isShippingModalOpen && (
            <ShippingModal 
                closeShippingModal={ closeShippingModal }
            />
        )
      }

      { /*Returns Modal */ }
      {
        isReturnsModalOpen && (
            <ReturnsModal 
                closeReturnsModal={ closeReturnsModal }
            />
        )
      }

      { /*Payment Modal */ }
      {
        isPaymentModalOpen && (
            <PaymentModal 
                closePaymentModal={ closePaymentModal }
            />
        )
      }

      { /*Review Modal */ }
      {
        isReviewModalOpen && (
            <WriteReviewModal 
                closeReviewModal={ closeReviewModal }
            />
        )
      }        
            
    </div>
    </>
  )
}

export default ProductDetail


export async function getServerSideProps({query}: GetServerSidePropsContext) {
  const id = query.id
  console.log(id);

  // Fetch data from external API
  try {
    const products: Product[]  = await getProducts()
    const product: Product|null  = await getProductsByID(id)
    if (product) {
      return { props: { product, products: products } }
    }else{
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
}
}