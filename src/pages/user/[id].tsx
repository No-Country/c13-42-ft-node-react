 
import { Order, User } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { BsDownload } from 'react-icons/bs'
import { formatDatesArray } from '~/utils/dates'
import getPdf from '~/utils/pdf'
import { updateOrder } from '~/utils/services/orders'
import { getUser } from '~/utils/services/user'



export default function User({user}:{user: User|any }) {
    console.log(user.order[0].products);

    const [order, setorder] = useState<any>()
    const [isorder, setIsorder] = useState<any>()
    

    return <div className="h-screen w-full flex overflow-hidden">
    <nav className="flex flex-col bg-gray-200 dark:bg-gray-900 w-64 px-12 pt-4 pb-6">
  
      
  
      <div className="mt-8">
        
        <h2
          className="mt-4 text-lg dark:text-gray-300 font-extrabold capitalize">
          Hello <h3 className='text-accentTeal'>{user.name ? user.name : user.email}</h3>
        </h2>
        <span className="text-sm dark:text-gray-300">
          <span className="font-semibold text-accentTeal mr-1">
            Id
          </span>
          { user.id}
        </span>
      </div>
  
      
  
      <ul className="mt-2 text-gray-600">
        <li className={`mt-8 ${isorder ? '' : 'shadow-[5px_5px_0px_0px_#14b8a6]' } rounded-md p-3 text-center flex items-center justify-center`}>
          <a href="#home" className="flex ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>

            <span
              className={`ml-2  rounded-md   capitalize font-medium text-black
              dark:text-gray-300`}>
              Orders
            </span>
          </a>
        </li>
  
        <li className="mt-8">
          <a href="#home" className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>


            <span
              className="ml-2 capitalize font-medium text-black
              dark:text-gray-300">
              Chat
            </span>
          </a>
        </li>
  
        <li
          className="mt-8  py-2 bg-white dark:bg-gray-200 rounded-lg
          -ml-4">
          <a href="#home" className="flex pl-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>

            <span className="ml-2 capitalize font-medium">Reviews</span>
          </a>
        </li>
  
        <li className="mt-8">
          <a href="#home" className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>

            <span
              className="ml-2 capitalize font-medium text-black
              dark:text-gray-300">
              Questions
            </span>
          </a>
        </li>
  
      </ul>
  
      <div className="mt-auto flex items-center text-red-700 dark:text-red-400">
        <a href="#home" className="flex items-center">
          <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012
              2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2
              0 012-2h9z"></path>
          </svg>
          <span onClick={()=> signOut()} className="ml-2 capitalize font-medium">log out</span>
        </a>
  
      </div>
    </nav>
    <main
      className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-700 transition
      duration-500 ease-in-out overflow-y-auto">
      <div className="mx-10 my-2">
        
        <section className='flex items-center justify-start p-2'>
          {
            isorder
            ?
            <button onClick={
              ()=>{
                setIsorder(false)
                setorder(false)
              }
            } className='px-4 flex items-center '>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
  
            </button>
            :
            <Link className='px-4 flex items-center ' href={'/'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            </Link>
          }
        <h2 className="my-4 text-4xl font-semibold dark:text-gray-400">
          {isorder ? "Order detail" : "Orders"}
        </h2>
        </section>
        <div
          className="pb-2 flex items-center justify-between text-gray-600
          dark:text-gray-400 border-b dark:border-gray-600">
  
          <div>
            {
              isorder
              ?
              <>
              <span>
              Order:
              <span className="text-accentTeal  ml-1 mr-1">
                {order.id}
              </span>
              
            </span>
              </>
              :
              <span>
              <span className="text-accentTeal  ml-1 mr-1">
                {user.order.length}
              </span>
              Orders
            </span>
            }
            
          </div>
          
  
        </div>
        {
          isorder
          ?
          <>
            <div className='flex w-full'>
            <div className='w-1/2 flex flex-col items-center justify-center'>
            <div className=' w-full flex justify-between shadow-md rounded-md m-10 p-4'>
                    <p className='text-black'>Name</p>
                    <p className='text-black'>Type</p>

                    <p className='text-black'>Quantity</p>
                    <p className='text-black'>Price</p>
                    <p className='text-black'>Subtotal</p>
                  </div>
            {
              order.products.map((item:any)=>{
                console.log(item.product);
                
                return(
                  <div className=' w-full flex justify-between items-center shadow-md rounded-md m-2 p-4'>
                    
                    <p className='text-black'>{item.product.name.length > 12 ? `${item.product.name.slice(0,12)}...`:item.product.name }</p>
                    <p className='text-black text-center'>{item.product.product_type}</p>

                    <p className='text-black text-center'>{item.quantity}</p>

                    <p className='text-black'>${Math.round(item.product.price)}</p>
                    <p className='text-black'>${Math.round(item.product.price * item.quantity)}</p>
                  </div>
                )
              })
            }
                                <div className=' w-full flex justify-end items-center shadow-md rounded-md m-2 p-4'>
             
                    <p className='text-black'>Total  ${order.total}</p>
                  </div>
            </div>
            <div className='w-1/2 flex shadow rounded-md m-2 flex-col items-center justify-start p-2'>
              <h2 className='font-bold m-2 text-accentTeal'>Chat</h2>
              <div className='w-full max-h-[360px] h-[360px] flex flex-col items-center justify-between overflow-y-scroll'>
                <section className=' p-4 max-h-4/5 h-4/5 w-full shadow border border-accentTeal rounded overflow-y-scroll'>
                <span className='flex items-center text-accentTeal'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <p className=' bg-accentTeal p-1 px-3 w-fit m-2 rounded text-white'>Hi, do you have any questions? This is the place for you.</p>
                </span>
                <span className='flex items-center text-accentTeal'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <p className=' bg-white p-1 px-3 w-fit m-2 border-accentTeal border rounded text-accentTeal'>Hello, I wanted to know the arrival date for my order.</p>
                </span>
                
                
                </section>
                <section className=' flex w-full justify-evenly items-center'>
                <input type="text" name="" id="" placeholder='Message..'  className='rounded w-4/5 p-2 shadow'/>
                <button className='  text-accentTeal text-base p-1 border border-accentTeal px-3 rounded shadow-[5px_5px_0px_0px_#14b8a6] m-2'>
                  Send
                </button>
                </section>
              </div>
            </div>
            </div>
          </>
          :
          <>
            <div
          className="mt-6 flex justify-evenly w-2/3 text-gray-600 dark:text-gray-400">
  
          <div className="ml-10 pl-2 flex  w-full justify-start capitalize">
            <span className="ml-8 flex items-center">
              Id
              
            </span>
            <span className="ml-24 flex items-center">
              Payment Status
              
            </span>
          </div>
  
          <div className="mr-12 flex w-full capitalize">
  
           
  
            <span className="mr-16 pr-2 flex items-center">
              Total
              
            </span>
  
           
            <span className="mr-16 flex items-center">
              Date
              
            </span>
            <span className="mr-12 flex items-center">
              Chat
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
</svg>

            </span>
            <span className="mr-16 pr-1 flex items-center">
              
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

            </span>
          </div>
  
        </div>
        {
          user.order.map((item: Order|any)=>{
            console.log(item);
            
            return (
              <div
          className="mt-2 flex px-4 py-4 justify-evenly bg-white
          dark:bg-gray-600 w-2/3 shadow-[5px_5px_0px_0px_#14b8a6] accent-accentTeal rounded-lg cursor-pointer ">
  
          <div className="ml-4 flex w-full justify-start">
  
            
  
            <div
              className="ml-4 flex flex-col justify-center capitalize text-gray-600
              dark:text-gray-400">
                
              <span onClick={()=>{
                console.log(item);
                
                setIsorder(true)
                setorder(item)}} className='hover:underline duration-200 '>{item.id.length > 10 ?  `${item.id.substring(0,10)}...` : item.id }</span>
              
            </div>
  
            <div
              className="ml-12 flex flex-col justify-center text-center capitalize text-gray-600
              dark:text-gray-400">
              <span className={` ${item.payment_status === 'SUCCESS' ? 'text-accentTeal': 'text-yellow-400'}`}>{item.payment_status}</span>
              
            </div>
  
          </div>
  
          <div className=" w-full flex justify-start">
  
            
  
            <div
              className="mr-14 flex justify-center items-center  capitalize text-gray-600
              dark:text-gray-400">
              <span>${item.total}</span>
              
            </div>
  
            <div
              className="mr-10 flex flex-col items-center justify-center capitalize text-gray-600
              dark:text-gray-400">
              
              <span className="">
               {item.date}
              </span>
            </div>
            <div
              className="mr-8 flex flex-col items-center justify-center capitalize text-gray-600
              dark:text-gray-400">
              
              <button onClick={()=>{
                setIsorder(true)
                setorder(item)}} className='p-2 border rounded-md border-black'>Go</button>
            </div>
  
            <div
              className="ml-8 flex flex-col items-center justify-center capitalize text-gray-600
              dark:text-gray-400">
              
              <button className='p-2 border rounded-md border-black'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>

              </button>
            </div>
          </div>
  
        </div>
            )
          })
        }
  
          </>
          
        }
       
  
      </div>
  
    </main>
  
  </div>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id: any = context.query.id  
  console.log(id);
  
  try {
      if (id) {

        const user: any = await getUser(id)
        
        user.order = formatDatesArray(user.order)
        user.questions = formatDatesArray(user.questions)
        user.reviews = formatDatesArray(user.reviews)
        
        console.log(user);

        return { props: { user } }

      }
      return { props: {  } }
    } catch (error) {
      console.log(error);
      
      return { props: {  } }
    }  
  
}