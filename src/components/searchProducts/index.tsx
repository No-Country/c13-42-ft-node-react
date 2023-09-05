import React, { useState, useContext } from "react";
import { Product } from "@prisma/client";
import { useRouter } from 'next/router';
import { SearchContext } from "../navbar";
export default function SearchProducts ( { products }: { products: Product[] } ) {

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isInputSelected, setIsInputSelected] = useState(false);
  const [maxResultsToShow, setMaxResultsToShow] = useState(10);
  const { setSearchModal } = useContext(SearchContext)

  const handleInputChange = (event: any) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if(searchTerm==="" || searchTerm===" ") {
      setIsInputSelected(false)
      return
    }
    setIsInputSelected(true);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const limitedResults: any = filteredProducts.slice(0, Math.min(maxResultsToShow, filteredProducts.length));
    setSearchResults(limitedResults);
  }

  const handleContainerBlur = () => {
    setIsInputSelected(false);
    setSearchTerm("")
  };

  return(
    <div onBlur={handleContainerBlur}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}

        className="pl-9 w-[27rem] h-9 placeholder:text-sm placeholder:text-grayLight border
        border-grayLight rounded-md" 
        placeholder="Search for clothes"
        />
        {isInputSelected && 
        <ul className="absolute bg-white shadow-[0px_0px_4px_0px_black] w-full rounded-[.1rem] border-none">
          {searchResults.map((product: Product) =>(
          <li className="p-[.5rem] cursor-pointer truncate hover:bg-whiteLight" key={product.id} onMouseDown={ ()=>{
            setSearchModal(false)
            router.push(`/products/${product.id}`).catch((error) => {
              console.error("Error while navigating:", error);
            });
            //Aqui debe ir el reset de los filtros por opciones
          }}>
          {product.name}    
          </li>
          ))}
        </ul>}
    </div>
  )
}