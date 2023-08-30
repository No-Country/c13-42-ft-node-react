import { Product } from "@prisma/client";
import HeroSlider from "~/components/heroSlider";
import Newsletter from "~/components/newsletter";
import ProductCard from "~/components/productCard";
<<<<<<< HEAD
import ShareYourOutfit from "~/components/shareYourOutfit";

=======
import { getProducts } from "~/utils/services/products";
import Navbar from "~/components/navbar";
>>>>>>> 4ae1c2bb30954cee91419cf77131f4781809f849
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
      <Navbar products={products} />

      <HeroSlider />

      <section className='mt-14 mx-[2%]'>
        <h2 className='mb-7 text-lg font-semibold text-text'> Recommended for you </h2>

        <div className="justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] gap-4 my-14 mx-[2%]">          {
            products.slice(0,4).map((product)  => (
              <ProductCard
                key={ product.id } 
                product={ product }
              />
            ))
          }
        </div>
      </section>

      <section className="mt-20">
        <Newsletter />
      </section>

      <section>
        <ShareYourOutfit />
      </section>
    </>
  );
}


export async function getServerSideProps() {
  // Fetch data from external API
  try {
    const products: Product[]  = await getProducts()
    return { props: { products: products } }
  } catch (error) {
    console.log(error);
    
  }
  
}