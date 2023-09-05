'use client'
 
import { Order } from '@prisma/client'
import { GetServerSidePropsContext } from 'next'
import { updateOrder } from '~/utils/services/orders'



export default function Success({order}:{order: Order }) {
    
    return <>total:  {order.total}</>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const preference_id: any = context.query.preference_id  
  try {
      if (preference_id) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' }

        const order: any = await updateOrder({status: 'SUCCESS', id: preference_id})
        order.date = order.date.toLocaleDateString(undefined, options)
        return { props: { order } }

      }
    } catch (error) {
      return { props: {  } }
    }  
  
}