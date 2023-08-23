import { Product } from "@prisma/client";
import HeroSlider from "~/components/heroSlider";
import ProductCard from "~/components/productCard";
import { getProducts } from "~/utils/services/products";

export interface Clothing {
  id: number,
  brand: string,
  name: string,
  price: number,
  image: string
}

// const products: Clothing[] = [
//   {
//       id: 1,
//       brand: "Zara",
//       name: "Abrigo cachemir",
//       price: 20,
//       image: "/assets/clothing_4.jpg"
//   },

//   {
//       id: 2,
//       brand: "H&M",
//       name: "Pantalón chino azul",
//       price: 10,
//       image: "/assets/clothing_1.jpg"
//   },

//   {
//       id: 3,
//       brand: "Mango",
//       name: "Sobrecamisa amarilla",
//       price: 18,
//       image: "/assets/clothing_3.jpg"
//   },

//   {
//       id: 4,
//       brand: "Nike",
//       name: "Air Black",
//       price: 30,
//       image: "/assets/clothing_2.jpg"
//   },
// ]



export default function Home({products}:{ products: Product[]}) {
  return (
    <>
      <HeroSlider />

      <section className='mt-14 mx-[4%]'>
        <h2 className='mb-7 text-lg font-semibold text-text'> Nuestra selección para ti </h2>

        <div className='flex flex-wrap justify-between'>
          {
            products.map((product)  => (
              <ProductCard
                key={ product.id } 
                product={ product }
              />
            ))
          }
        </div>
      </section>
    </>
  );
}


export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const products: Product[]  = await getProducts()
    return { props: { products: products.slice(0,4) } }
  } catch (error) {
    console.log(error);
    
  }
  
}