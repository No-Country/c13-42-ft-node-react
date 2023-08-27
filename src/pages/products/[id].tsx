/* eslint-disable @next/next/no-img-element */
"use client"

import { Product } from "@prisma/client"
import { GetServerSidePropsContext } from "next"
import { IconContext } from "react-icons"
import { FaTruck } from "react-icons/fa"
import { HiOutlineReceiptRefund } from "react-icons/hi"
import { getProductsByID } from "~/utils/services/products"

const ProductDetail = ({product}: {product: Product|null}) => {

  return (

    <div className=' flex justify-between my-20 ml-[10%] mr-[4%] h-auto flex-col md:flex-row'>
      <div className="w-[100%] md:w-[50%]" >
        <img src={product?.images[0]} alt='' className='w-[100%] h-[24rem] object-contain'/>
      </div>

      <div className="w-[100%] md:w-[42%]">
        <p className="mt-6 mb-1 text-sm font-medium text-text" > {product?.gender} | {product?.product_type} </p>
        <h2 className="mb-2 text-3xl font-semibold text-text"> {product?.name} </h2>
        <p className="mt-2 mb-1 text-sm font-medium text-text" > {product?.sub_title} </p>

        <p className="mb-8 text-xl font-medium text-text" > ${product?.price}</p>

       
        <div className="flex items-center mb-3 " >
          <IconContext.Provider value={{ className:"mr-3 w-5 h-5" }} >
            <FaTruck />
          </IconContext.Provider>
          <p className="text-text"> Free shipping on purchases over $25 </p>
        </div>

        <div className="flex items-center" >
          <IconContext.Provider value={{ className:"mr-3 w-5 h-5" }} >
            <HiOutlineReceiptRefund />
          </IconContext.Provider>
          <p className=" text-text"> Free returns and refund </p>
        </div>

        <button className="mt-10  w-56 h-14 bg-darkBackground text-white rounded-md cursor-pointer"> 
          Add to cart 
        </button>

      </div>
      
     
        
            
       

        
      
    </div>
  )
}

export default ProductDetail


export async function getServerSideProps({query}: GetServerSidePropsContext) {
  const id = query.id
  console.log(id);

  // Fetch data from external API
  try {
    const product: Product|null  = await getProductsByID(id)
    if (product) {
      return { props: { product } }
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