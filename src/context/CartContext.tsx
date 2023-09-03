"use client"
import { type Dispatch, type SetStateAction, createContext, useState, type ReactNode } from "react"


export interface ProductData {
    id: string | undefined,
    name: string | undefined,
    category: string | undefined,
    price: number | undefined,
    brand: string | undefined,
    gender: string | undefined ,
    images: string[] | undefined ,
    sub_title: string | undefined
} 

interface CartProviderProps {
    children: ReactNode
}


interface cartModel {
    fullCart: ProductData[],
    cartCount: number,
    subTotalOneProduct: number | undefined,
   
    setFullCart: Dispatch<SetStateAction<ProductData[]>>,
    setCartCount:  Dispatch<SetStateAction<number>>,
    sumSubTotalOneProduct: (productPrice: number, productQuantity: number) => void,
  
    emptyCart: () => void
}


export const CartContext = createContext( {} as cartModel )

export const CustomCartContext = ({ children }: CartProviderProps  ) => {

    const [productsInCart, setProductsInCart] = useState<ProductData[]>([])
    const [quantity, setQuantity] = useState<number>(1)
    const [subTotalOneProduct, setSubTotalOneProduct] = useState<number>(0)

    const sumSubTotalOneProduct = ( productPrice: number, productQuantity: number ) => {
        const subTotal = productPrice * productQuantity
        setSubTotalOneProduct( subTotal  ) 
    }

    
    const emptyCart = ( ) => {
        setProductsInCart([])
        setQuantity(1)
    }

    return(

        <CartContext.Provider 
            value={{
             
                fullCart: productsInCart, 
                cartCount: quantity,
                subTotalOneProduct: subTotalOneProduct,
               
                setFullCart: setProductsInCart,
                setCartCount: setQuantity,
                sumSubTotalOneProduct: sumSubTotalOneProduct,
            
                emptyCart
                
            }}
        >
            { children }
        </CartContext.Provider>
    )
}


