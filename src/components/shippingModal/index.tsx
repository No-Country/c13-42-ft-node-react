"use client"
import React from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle, FaRegMoneyBillAlt } from 'react-icons/fa'
import { MdLocalShipping } from "react-icons/md"

interface shipping {
    zone: string,
    cost: string,
    deliveryTime: string
}

interface closeModal {
    closeShippingModal: () => void
}


const ShippingModal = ({ closeShippingModal }: closeModal ) => {

  const shipping: shipping[] = [
    {
        zone: "North America",
        cost: "$8",
        deliveryTime: "5 to 7 days"
    },

    {
        zone: "Latin America",
        cost: "$4",
        deliveryTime: "3 to 5 days"
    },

    {
        zone: "Europe",
        cost: "$18",
        deliveryTime: "one week"
    },

    {
        zone: "Asia and the rest of the world",
        cost: "$12",
        deliveryTime: "one or two weeks"
    },
  ]  


  return (

    <div className='absolute top-[39rem] left-0 flex justify-center items-center w-full h-screen bg-modalBackground'>
      
      <div className='relative px-[4%] w-[64%] h-auto bg-grayLightSoft'>
        <h2 className='mt-9 text-lg font-medium text-text'> Shipping </h2>
        <div onClick={ closeShippingModal }>
            <IconContext.Provider value={{ className:"absolute top-[8%] right-[5%] w-5 h-5 cursor-pointer" }}>
                <FaRegTimesCircle/>
            </IconContext.Provider>
        </div>
        
        
        {/*National Purchases */}
        <>
            <p className='mt-5 mb-2 text-xs text-text'> National purchases </p> 
            <div className='flex items-start gap-4'>
                <IconContext.Provider value={{ className:"w-6 h-6"}} >
                    <MdLocalShipping/>
                </IconContext.Provider>         
                <div>
                    <p className='text-sm' ><span className='font-semibold text-blue-600'> Free shipping </span> on purchases over $30 </p>
                    <p className='mt-1 text-sm text-text' > On purchases under $30, the shipping fee is <span className='font-semibold text-blue-600'> $4 </span> </p>
                </div>           
            </div>
        </>

        <div className='my-4 w-full border border-gray-300 '/>


        { /*International Shopping */ }
        <>
            <p className='mb-2 text-xs text-text'> International shopping </p> 
            <div className='flex items-start gap-4'>
                <IconContext.Provider value={{ className:"w-6 h-6" }} >
                    <FaRegMoneyBillAlt/>
                </IconContext.Provider>
                <div className='mb-7'>
                    {
                        shipping.map((item, index) => (
                            <p key={index} className='mb-1 text-sm text-text' > { `Shipping to ${ item.zone} will cost `} <span className='font-semibold text-blue-700'> { item.cost } </span> { `Your product will be shipped within ${ item.deliveryTime}`}  </p>
                        ))
                    }
                </div>
            </div>
        </>
      </div>
    </div>
  )
}

export default ShippingModal
