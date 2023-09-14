'use client'
 
import { Order } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsDownload } from 'react-icons/bs'
import getPdf from '~/utils/pdf'
import { updateOrder } from '~/utils/services/orders'



export default function Success({order}:{order: Order|any }) {
    
    return <div className="bg-gray-100 h-screen flex  flex-col items-center justify-center">
          <div className="bg-white p-6  md:mx-auto">
            <svg viewBox="0 0 24 24" className="text-accentTeal w-16 h-16 mx-auto my-6">
                <path fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                </path>
            </svg>
            <div className="text-center">
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                <p> Have a great day!  </p>
                <div className="py-10 text-center flex justify-center items-center">
                    <Link href="/" className=" m-3 px-4 bg-accentTeal hover:bg-white  text-white border border-accentTeal rounded-md font-normal py-2 hover:text-accentTeal  duration-200">
                        GO BACK 
                   </Link>
                   <button onClick={()=>{getPdf({client:{email: order.user.email}, invoice: {
                    id: order.id,
                    createdAt: order.date,
                    products: order.products.map((item: any)=>{
                      return {...item.product, quantity: item.quantity}
                    }),
                    total: order.total,
                    status: order.payment_status
                   }})}} className="px-8 m-3 p-3 bg-accentTeal hover:bg-white  text-white border border-accentTeal hover:text-accentTeal rounded-md font-bold duration-200">
                        <BsDownload fontWeight={700}/> 
                   </button>
                </div>
            </div>
        </div>
      </div>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const preference_id: any = context.query.preference_id  
  try {
      if (preference_id) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' }

        const order: any = await updateOrder({status: 'SUCCESS', id: preference_id})
        console.log(order);
        
        order.date = order.date.toLocaleDateString(undefined, options)
        return { props: { order } }

      }
    } catch (error) {
      return { props: {  } }
    }  
  
}