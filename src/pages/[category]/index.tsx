import { Product } from "@prisma/client";
import { getProducts } from "~/utils/services/products";
import ProductCard from "~/components/productCard";
import SelectOptions from "~/components/select";
import { createContext, useState } from "react";
import Navbar from "~/components/navbar";
import { GetServerSidePropsContext } from "next";


const [selectOptions, setSelectOptions] = useState<string>('')

export const ProductContext = createContext({ selectOptions, setSelectOptions });

export default function Category( {products, category}: { products : Product[], category: any } ) {
  const [selectOptions, setSelectOptions] = useState<string>('')
  const methodSelectOptions = (products:Product[]) => {
    switch(selectOptions) {
      case "Price: Low-High": {
      const newArreglo = [...products].sort((a,b) => a.price-b.price)
      return newArreglo
      }
      case "Price: High-Low": {
      const newArreglo = [...products].sort((a,b) => b.price-a.price)
      return newArreglo;
      }
      default: 
      return products;
    }
  }
  return (
    <ProductContext.Provider value={{ selectOptions, setSelectOptions }}>
      <Navbar products={products} />

      <section className='flex flex-col py-[50px]'>

        <SelectOptions/>
        
        <div className="justify-center items-center grid grid-cols-[repeat(auto-fit,minmax(250px,250px))] gap-8 my-14 mx-[2%]">
        {
            methodSelectOptions( category === 'All' ? products : products.filter( product => product.category === category)).map((product)  => (
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Fetch data from external API
  const category = context?.params?.category;

  try {
    const products: Product[]  = await getProducts()
    return { props: { 
      products: products,
      category
     }
     
   
     }
  } catch (error) {
    console.log(error);
    
  }
  
}