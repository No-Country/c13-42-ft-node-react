"use client"
import { type Dispatch, type SetStateAction, createContext, useState, type ReactNode } from "react"


export interface ProductData {
    id: string | undefined ,
    name: string | undefined,
    category: string | undefined,
    price: number | undefined,
    brand: string | undefined,
    gender: string | undefined,
    images: string[] | undefined,
    sub_title: string | undefined
} 

interface CartProviderProps {
    children: ReactNode
}


interface cartModel {
    fullCart: ProductData[],
    setFullCart: (product: ProductData) => void,
    emptyCart: () => void
}


export const CartContext = createContext( {} as cartModel )

export const CustomCartContext = ({ children }: CartProviderProps  ) => {

    const [productsInCart, setProductsInCart] = useState<ProductData[]>([])


    const emptyCart = ( ) => {
        setProductsInCart([])       
    }

    const addToCart = ( product: ProductData ) => {
        setProductsInCart( 
            [...productsInCart, product]
        )
        alert(`You added to cart: ${ product.name } `)
    }

    return(

        <CartContext.Provider 
            value={{
                fullCart: productsInCart,
                setFullCart: addToCart,
                emptyCart
            }}
        >
            { children }
        </CartContext.Provider>
    )
}


