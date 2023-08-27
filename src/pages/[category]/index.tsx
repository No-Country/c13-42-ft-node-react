import { Product } from "@prisma/client";
import { getProducts } from "~/utils/services/products";
import ProductCard from "~/components/productCard";
import SelectOptions from "~/components/select";
import { createContext, useState } from "react";

export const ProductContext = createContext();

export default function Category({products}:{ products: Product[]}) {
  const [selectOptions, setSelectOptions] = useState<string>('')

  const methodSelectOptions = (products:Product[]) => {
    switch(selectOptions) {
      case "Menor a mayor": {
      const newArreglo = [...products].sort((a,b) => a.price-b.price)
      return newArreglo
      }
      case "Mayor a menor": {
      const newArreglo = [...products].sort((a,b) => b.price-a.price)
      return newArreglo;
      }
      default: 
      return products;
    }
  }

  return (
    <ProductContext.Provider value={{ selectOptions, setSelectOptions }}>
      <section className='flex flex-col py-[50px]'>

        <SelectOptions/>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] gap-4 my-14 mx-[4%]">
        {
            methodSelectOptions(products).map((product)  => (
              <ProductCard
                key={ product.id } 
                product={ product }
              />
            ))
        }
        </div>
        
      </section>
    </ProductContext.Provider>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const category = context.params.category
  try {
    const products: Product[]  = await getProducts()
    return { props: { products: category === 'All' ? products : products.filter( product => product.category === category) } }
  } catch (error) {
    console.log(error);
    
  }
  
}