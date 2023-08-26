import HeroSlider from "~/components/heroSlider";
import Newsletter from "~/components/newsletter";
import ProductCard from "~/components/productCard";

export interface Clothing {
  id: number,
  brand: string,
  name: string,
  price: number,
  image: string
}

const products: Clothing[] = [
  {
      id: 1,
      brand: "Zara",
      name: "Coat",
      price: 20,
      image: "/assets/clothing_4.jpg"
  },

  {
      id: 2,
      brand: "H&M",
      name: "Blue pants",
      price: 10,
      image: "/assets/clothing_1.jpg"
  },

  {
      id: 3,
      brand: "Mango",
      name: "Yellow overshirt",
      price: 18,
      image: "/assets/clothing_3.jpg"
  },

  {
      id: 4,
      brand: "Nike",
      name: "Air Black",
      price: 30,
      image: "/assets/clothing_2.jpg"
  },
]



export default function Home() {
  return (
    <>
      <HeroSlider />

      <section className='mt-14 mx-[4%]'>
        <h2 className='mb-7 text-lg font-semibold text-text'> Recommended for you </h2>

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

      <section className="mt-20">
        <Newsletter />
      </section>
    </>
  );
}
