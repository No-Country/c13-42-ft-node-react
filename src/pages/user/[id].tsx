'use client'
 
import { Order, User } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { BsDownload } from 'react-icons/bs'
import { formatDatesArray } from '~/utils/dates'
import getPdf from '~/utils/pdf'
import { updateOrder } from '~/utils/services/orders'
import { getUser } from '~/utils/services/user'



export default function User({user}:{user: User|any }) {
    console.log(user);
    
    return <div className="bg-gray-100 h-screen flex  flex-col items-center justify-center"></div>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id: any = context.query.id  
  console.log(id);
  
  try {
      if (id) {

        const user: any = await getUser(id)
        
        user.order = formatDatesArray(user.order)
        console.log(user);

        return { props: { user } }

      }
      return { props: {  } }
    } catch (error) {
      console.log(error);
      
      return { props: {  } }
    }  
  
}