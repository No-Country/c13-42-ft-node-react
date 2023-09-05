"use client"
import { type ReactElement } from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle } from 'react-icons/fa'
import { AiOutlineInbox  } from "react-icons/ai"
import { BsMailbox } from "react-icons/bs"
import { RiRefund2Line } from "react-icons/ri"
import { TbShirtOff } from "react-icons/tb"

interface returns {
    icon: ReactElement,
    text: string
}

interface closeModal {
    closeReturnsModal: () => void
}

const ReturnsModal = ({ closeReturnsModal }: closeModal ) => {

  const returns: returns[] = [
    {
        icon: <AiOutlineInbox/>,
        text: "Free returns within 30 days of your purchase"
    },
    {
        icon: <BsMailbox/>,
        text: "Returns your products at the nearest post office to your address"
    },
    {
        icon: <RiRefund2Line/>,
        text: "Full refund within a limit of 15 days after your purchase"
    },
    {
        icon: <TbShirtOff/>,
        text: "Returns are not allowed on damaged, broken or mistread products"
    },
  ]  

  return (

    <div className='absolute top-[39rem] left-0 flex justify-center items-center w-full h-screen bg-modalBackground '>
      
      <div className='relative px-[4%] w-[64%] h-auto bg-grayLightSoft'>
        <h2 className='mt-9 text-lg font-medium text-text'> Returns </h2>
        <div onClick={ closeReturnsModal }>
            <IconContext.Provider value={{ className:"absolute top-[8%] right-[5%] w-5 h-5 cursor-pointer" }}>
                <FaRegTimesCircle/>
            </IconContext.Provider>
        </div>
        
        { /* Returns % Refunds conditions */ }
        <div className='mb-8' >
            {
                returns.map((item, index) => (
                    <div key={ index } className='flex items-start gap-4 mt-5 mb-1'>
                        <IconContext.Provider value={{ className:"w-6 h-6"}} >
                           { item.icon }
                        </IconContext.Provider>         
                        <div>
                            <p className='text-sm'> { item.text } </p>
                        </div>           
                    </div>
                ))
            }     
        </div>
      </div>
    </div>
  )
}

export default ReturnsModal
