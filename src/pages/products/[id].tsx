/* eslint-disable @next/next/no-img-element */
"use client"

interface bars {
  id: string,
  barRanking: string,
  width: string
}

import { Review, type Product } from "@prisma/client"
import { type GetServerSidePropsContext } from "next"
import { IconContext } from "react-icons"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Navbar from "~/components/navbar"
import {  getProducts, updateViews } from "~/utils/services/products"
import { useEffect, useState } from "react"
import { IoReturnDownForwardSharp } from "react-icons/io5"
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im"
import ShippingModal from "~/components/shippingModal"
import PaymentModal from "~/components/paymentModal"
import ReturnsModal from "~/components/returnsModal"
import WriteReviewModal from "~/components/writeReviewModal"
import SponsoredProductCard from "~/components/sponsoredProductCard"
import { postQuestion } from "~/utils/requests/question"
import { useSession } from "next-auth/react"
import { postAnswer } from "~/utils/requests/answers"
import { postReview } from "~/utils/requests/review"
import Footer from "~/components/footer"
import { addToWishlist, removeFromWishlist } from "~/utils/requests/wishlist"


const ProductDetail = ({product, products}: {product: Product|any, products: any}) => {

  const { data: session, status } = useSession()

  const [answers, setAnswer] = useState <any>(product.questions.map((item: any, i: number)=>{
    if (!item.answer) {
      return {...item, answer: {content: ''}}
    }
    return item
  }))


  const [questionInput, setQuestionInput] = useState<string>("")
  const [questionArray, setQuestionArray] = useState<Array<any>>(product.questions)
  const [reviewArray, setReviewArray] = useState<Array<Review>>(product.reviews)
  
  const [size, setSize] = useState<string>("M")

  const [wishlist, setWishlist] = useState<boolean>(session?.user.id && (product.wishlists).some((user: any) => user.userID === session?.user.id) ? true: false  )

  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false)
  const [isReturnsModalOpen, setIsReturnsModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const [success, setSuccess] = useState(false)
  const [questionError, setQuestionError] = useState<any>(false)


  

  
  const averageScore = reviewArray.length > 0 ? Math.round( ((reviewArray.reduce((accumulator, currentValue) => accumulator + currentValue?.score, 0))/reviewArray.length)) : 0


  useEffect(() => {
    setWishlist(session?.user.id && (product.wishlists).some((user: any) => user.userID === session?.user.id) ? true: false)
    getCart()
  }, [session])
  
  function getCart() {
    const local = localStorage.getItem('cart') 
    const items = local ?  JSON.parse(local) : []
    let item = items.find((item:any) => item.id === product.id)
    console.log(item);
    

    return items
  }
const handleAddToCart = () => {
  console.log(size);
  
    const cart = getCart()
    console.log([{...product, quantity: 1},...cart]);
    setSuccess(true)
    if (cart.some((element: any) => element.id === product.id)) {
        const updated = cart.map((item:any)=>{
            if (item.id === product.id) {
                return {...item, quantity: item.quantity + 1, size: size}
            }else{
                return item
            }
            
        })
        localStorage.setItem('cart', JSON.stringify(updated));
        getCart()
    }else{
        localStorage.setItem('cart', JSON.stringify([{...product, quantity: 1, size: size},...cart]));
    }

    setTimeout(() => {
      setSuccess(false)
    }, 2000);

}


const handleCreateQuestion =async()=>{
    try {
      if(session?.user.id && questionInput.length > 3){
        const question  = await postQuestion(product.id, questionInput, session.user.id)
        console.log(question);
        
        if (question) {
          console.log(question);
          setQuestionInput('')
          setQuestionArray([question, ...questionArray])
          setAnswer([{...question, answer: {content: ''}}, ...answers])
        }
      }else{
        throw {message: 'Question has to be at least 3 characters.'}
      }
  
    } catch (error) {
      console.log(error);
      setQuestionInput('')
      setQuestionError(error)
      
    }
  }
  const handleWishlist =async()=>{
    try {
      if(session?.user.id && !wishlist){
        setWishlist(true)
        const wishlist  = await addToWishlist(product.id, session.user.id)
        console.log(wishlist);
        
        if (wishlist) {
          console.log(wishlist);
          
        }else {
          setWishlist(false)

        }

      } else{
        if (session?.user.id) {
          setWishlist(false)
          const wishlist  = await removeFromWishlist([{id: product.id}], session.user.id)
          if (wishlist) {
            console.log(wishlist);
            
          }else {
            setWishlist(true)
          }

        }

      }
  
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleCreateReview =async(content: string, title: string, score: number)=>{
    try {
      if(session?.user.id && content.length > 3){
        const review  = await postReview(product.id, content, session.user.id, score, title)
        console.log(review);
        
        if (review) {
          console.log(review);
          review.date = 'now'
          setReviewArray([review, ...reviewArray])
          closeReviewModal()
        }
      } else {
        throw {message: 'Review must be at least 3 characters long.'}
      }
  
    } catch (error) {
      console.log(error);
      return error
    }
  }

  const handleAnswer =async(questionId: number,content: string )=>{
    try {
      if(session?.user.id){
        const answer  = await postAnswer(questionId, content, session.user.id)
        
        if (answer) {
          console.log(answer);
          setQuestionInput('')
          setQuestionArray(questionArray.map((item)=>{
            if (item.id == questionId) {
              return {...item, answer}
            }
            return item
          }))
          
        }

      }
  
    } catch (error) {
      console.log(error);
      
    }
  }

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

  const sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"]

  const bars: bars[] = [
    {
      id:"bar_1",
      barRanking: "excellent",
      width: `w-[12rem]`
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
    <Navbar products={products} category={''}/>
    <div className=' flex flex-col md:flex-row justify-between mt-20 ml-[10%] mr-[4%] h-auto'>
      <div className="w-full md:w-[50%] flex md:block items-center justify-center" >
        <img src={product?.images[0]} alt='' className='w-[70%] h-[24rem] object-contain'/>

        <div>

          { /*FAQ SECTION */ }
          <div className="hidden md:block mt-24 w-full h-auto" >
            <h2 className="mb-5 text-4xl font-medium text-text " > FAQ </h2>
              <h3 className="mb-2 text-xl font-medium text-text"> Topics </h3>
              <div className="flex gap-4" >

                <div 
                  className="flex rounded-md justify-center items-center  w-auto px-3 h-8 bg-accentTeal cursor-pointer"
                  onClick={ () => setIsShippingModalOpen(true)    }
                >
                  <p className="text-sm  text-text"> Shipping </p>
                </div>

                <div 
                  className="flex rounded-md justify-center items-center  w-auto px-3 h-8 bg-accentTeal cursor-pointer"
                  onClick={ () => setIsReturnsModalOpen(true)   }
                >
                  <p className="text-sm  text-text"> Returns </p>
                </div>

                <div 
                  className="flex rounded-md justify-center items-center  w-auto px-3 h-8 bg-accentTeal cursor-pointer"
                  onClick={ () => setIsPaymentModalOpen(true) }
                >
                  <p className="text-sm  text-text"> Payment Methods </p>
                </div>    
              </div>
          </div>


          {/* Ask to seller section */  }
          <div className="hidden md:block mt-8 mb-6 w-[84%] border border-grayLight" />
            {
              session?.user.id ? 
              <>
                <h3 className="hidden md:flex mb-2 text-xl font-medium text-text"> Ask to seller  </h3>
            <div className=" gap-5 hidden md:flex"  >
              <input 
                className={`pl-4 w-[22rem] h-9 border placeholder:text-sm ${questionError ? 'border-red-500  placeholder:text-red-500': 'border-gray  placeholder:text-gray'}`} 
                placeholder={questionError ? questionError.message : "e.g. Do you have size 5 or 6?"}
                value={ questionInput}
                onChange={ e => {
                  setQuestionError(null)
                  setQuestionInput(e.target.value) }
                }
              />
              <button onClick={handleCreateQuestion}
                className="mb-6 rounded-md  w-[5rem] h-9 bg-darkBackground text-white" 
              > Ask </button>
            </div>
              </>
              :
              null
            }

            {
              questionArray.length == 0 ? (
                <p className="hidden md:flex"> No questions founded </p> 
              ) : (
                questionArray.slice(0,3).map((item, i)=>{
                  return (
                    <>
                    <div className="hidden md:block mb-4" >
                 <div className="flex">
                 <p className="max-w-[84%] text-lg font-semibold text-text" > {item.content} </p>
                 <p className="max-w-[84%] ml-3 mt-1 text-sm font-thin text-grayDark" > { item.user.id == session?.user.id ? 'You' :  item.user.email.split('@')[0] } </p>
                 </div>

                    <div className="flex items-start mt-2 ">
                    
                      { item.answer && item.answer?.content !== '' ?
                      <>
                      <IconContext.Provider value={{ className:"mx-3 w-6 h-6" }}>
                      <IoReturnDownForwardSharp/>
                    </IconContext.Provider> 
                       <p className="max-w-[76%] text-sm font-medium"> {item.answer?.content} </p> </>
                       :
                       session?.user.is_admin 
                       ?
                       <div className="flex">
                          <input 
                className="pl-4 w-[22rem] h-9 border border-gray placeholder:text-sm placeholder:text-gray" 
                placeholder=" Answer to user question"
                id={item.id}
                value={ answers[i].answer.content}
                onChange={ e => setAnswer(answers.map((item:any)=>{
                  if (item.id == e.target.id) {
                    return {...item, answer: {content: e.target.value}}
                  } else {
                    return item
                  }
                })) }
              />
                    <button onClick={()=>{handleAnswer(item.id, answers[i].answer.content)}}
                      className=" ml-4 w-[5rem] rounded-md h-9 bg-darkBackground text-white" 
                      > Answer </button>
                       </div>
                        :
                        null
                       
                      }
                    </div>
                </div>
                  </>
                  )
                  
                })
              )
            }

          <div className="hidden md:block my-6 w-[84%] border border-grayLight"/>

          {/*Reviews Section */}
          <div className="hidden md:block relative mb-10">
            <h3 className=" text-xl font-medium text-text"> Reviews </h3>
            <div className="flex gap-7 items-center">
            {
              reviewArray.length == 0 ? null : 
              <>
              <p className="text-5xl font-medium text-text"> { averageScore} </p>
              <div className="flex flex-col" > 
                {
                  bars.map( bar => (
                    <div key={ bar.id } className="flex justify-between items-center gap-3">
                      <div className={`${bar.width} h-[0.4rem] bg-darkBackground `} />
                        <p className="text-xs font-light text-text"> { bar.barRanking } </p>
                      </div>
                  ))
                }
              </div></>}
            
              {
                session?.user.id 
                ?
                <div className="flex  items-center mt-11 mb-14 ">
                    <button 
                      className="w-52 h-10 rounded-md bg-darkBackground text-sm text-white" 
                      onClick={() => setIsReviewModalOpen(true) }
                    > Write a review </button> 
              </div> 
              :
              null

              }
            </div>

            {
              reviewArray.length == 0 ? (
                <>
                  <p className="mt-8 text-sm text-gray-500" > There are not reviews yet. Be the first to comment! </p>
                  
                </>
              ) : (
                reviewArray.slice(0,2).map((item: any)=>{
                  return (
                    <>
                  <div className="mt-11 flex items-start gap-4">
                    <img src={item.user.images ?  item.user.images  : 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg'} alt="user" className="w-10 h-10 object-cover rounded-full"/>
                      <div className="w-[25.5rem]">
                        <p className="-mt-1 mb-1 font-bold text-text"> { item.user.id == session?.user.id ? 'You' :  item.user.email.split('@')[0] } </p>
                        <div className="flex gap-1">
                          <IconContext.Provider value={{ className:"w-3 h-3 text-text" }}>

                          {[...Array(item.score)].map((x, i) =>
                            <ImStarFull key={i}/>
                          )}
                          {[...Array(5 - item.score)].map((x, i) =>
                            <ImStarEmpty key={i}/>
                          )}
                            
                          </IconContext.Provider>
                        </div>
                        <p className="mt-4 mb-1 text-xs text-gray"> {item.date} </p>
                        <p className="text-sm text-text leading-5 " > {item.content}  </p>
                      </div>
                    </div>

                  
                </> 
                  )
                })                                  
              )

            }
            
          </div>
        </div>
      </div>


      { /*Right Side - Product Info */ }            
      <div className="w-full md:w-[42%]">
        <p className="mt-6 mb-1 text-sm font-medium text-text" > {product?.gender} | {product?.product_type} </p>
        <h2 className="mb-2 text-3xl font-semibold text-text"> {product?.name} </h2>
        <p className="my-1 text-sm font-medium text-text" > {product?.sub_title} </p>
        <div className="flex gap-1 mb-3">
            <IconContext.Provider value={{ className:"w-4 h-4 text-text" }}>
            {[...Array(averageScore)].map((x, i) =>
                            <ImStarFull key={i}/>
                          )}
                          {[...Array(5 - averageScore)].map((x, i) =>
                            <ImStarEmpty key={i}/>
                          )}
            </IconContext.Provider>
        </div>

        <p className="mb-8 text-3xl font-semibold text-text" > ${Math.round(product?.price)}</p>

        <div className="mt-4 flex items-center gap-5">
            <button onClick={handleAddToCart} className={` ${success ? " bg-transparent text-accentTeal border-accentTeal flex items-center justify-center border "  : " bg-darkBackground text-white cursor-pointer  hover:bg-white hover:text-darkBackground  border border-darkBackground"} rounded-md w-56 h-12 duration-300 transition-all `}> 
                {success ? <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg>
                  </> : "Add to cart"} 
            </button>
            <button 
                disabled={status === 'authenticated' ? false : true}
                className={`flex rounded-md justify-center items-center w-12 h-12 text-xl text-text border border-darkBackground cursor-pointer`} 
                onClick={() => 

                  handleWishlist() }
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
                  sizes.map( (item, index) => (
                    <div onClick={()=>{
                      setSize(item)
                    }} key={ index } className={`flex justify-center items-center rounded-md w-10 h-8  border border-black cursor-pointer hover:bg-darkBackground ${size === item ? "bg-darkBackground text-white" : ''} hover:text-white hover:ease-in hover:duration-300`} >
                      <p className="text-sm"> { item } </p>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }

      <div className="my-5 w-full border border-grayLight "/>
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
                handleCreateReview= {handleCreateReview}
            />
        )
      }        
            
    </div>
    <Footer/>
    </>
  )
}

export default ProductDetail


export async function getServerSideProps({query}: GetServerSidePropsContext) {

  const id: string|any = query.id
  console.log(id);

  // Fetch data from external API
  try {
    const products: Product[]  = await getProducts()

    const product: Product|any  = await updateViews(id)
    
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