
import { Product } from '@prisma/client';
import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { BsArrowLeft } from 'react-icons/bs';
import Chart from '~/components/chart';
import { formatDate, formatDatesArray } from '~/utils/dates';
import { getOrders } from '~/utils/services/orders';
import { getProductsAmount } from '~/utils/services/products';

const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];



export default function PlaygroundPage({products, orders}: {products: Product[], orders: any}) {
    const data = [
        {
          category: 'Most Viewed',
          stat: products.reduce((accumulator, currentValue) => accumulator + currentValue.views, 0),
          data: products,
          text: ['Products', "Views", "Total views"]

        },
        {
          category: 'Orders',
          stat: orders.length,
          data: orders.slice(0,5),
          text: ['Buyer email', "Total", "Total orders"]
        },
        
      ];
  return (

    <>
        <nav className=' m-6 flex '>
            <span>
                <h1 className=' font-bold'>
                    <Link href={'/'}>
                    <BsArrowLeft/>
                    </Link>
                </h1>
            </span>
        </nav>
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>{item.text[2]}</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>{item.text[0]}</Text>
              <Text className="text-right">{item.text[1]}</Text>
            </Flex>
            <BarList
              data={item.data}
              
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      <Chart />

    </main>
    </>
  );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    
    try {
  
          const products: any = await getProductsAmount(5)
          let orders: any  =await getOrders()
          orders = orders.map((item: any)=>{
            console.log(formatDate(item.date));
            const date = formatDate(item.date)
            return {...item, date: date , value: `$ ${item.total}`, name: item.user.email}
          })
          products.map((item: Product|any)=>{
            item.value = item.views
            return item
          })
          console.log(orders);
          
          return { props: { products, orders } }
      } catch (error) {
        console.log(error);
        
        return { props: {  } }
      }  
    
  }