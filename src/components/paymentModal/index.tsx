/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import { IconContext } from 'react-icons'
import { FaRegTimesCircle } from 'react-icons/fa'

interface closeModal {
    closePaymentModal: () => void
}

const PaymentModal = ({ closePaymentModal }: closeModal) => {

  return (

    <div className='absolute top-[39rem] left-0 flex justify-center items-center w-full h-screen bg-modalBackground'>

        <div className='relative px-[4%] w-[64%] h-auto bg-grayLightSoft'>
            <h2 className='mt-9 text-lg font-medium text-text'> Payment Methods </h2>
            <div onClick={ closePaymentModal }>
                <IconContext.Provider value={{ className:"absolute top-[8%] right-[5%] w-5 h-5 cursor-pointer" }}>
                    <FaRegTimesCircle/>
                </IconContext.Provider>
            </div>

            {/* Payment Methods */}
            <div className='flex items-start gap-4 mt-4 ' >
                <img src='/assets/mercado_pago.svg' alt='mercado pago logo' className='w-7 h-7' />
                <p className='text-sm text-text'> We use <span className='font-semibold'> Mercado Pago </span> to process all payments. Mercado Pago is easy to use, secure and fast. No additional charges. </p> 
            </div>

            <p className='mt-5 mb-2 text-sm text-text'> Credit cards allowed </p>

            <div className='flex items-center gap-3 my-2 '>
                <img src='/assets/mastercard.svg' alt='mastercard logo' className='w-5 h-5' />
                <p> Mastercard </p>
            </div>

            <div className='flex items-center gap-3 mt-1 mb-7 '>
                <img src='/assets/visa.svg' alt='visa logo' className='w-5 h-5' />
                <p> Visa </p>
            </div>            
        </div>
    </div>
  )
}

export default PaymentModal
