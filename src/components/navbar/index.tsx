"use client"

import { useState } from "react"
import { IconContext } from "react-icons"
import { FaShoppingCart, FaHeart, FaSistrix, FaUser } from "react-icons/fa"
import LoginModal from "../loginModal"
import CartModal from "../cartModal"
import Link from "next/link"



const Navbar = () => {

  const [cartCount, setCartCount] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false)

  const categories: string[]= ["All categories", "T-shirt", "Sweater", "Dress", "Jeans", "Underwear", "Footwear", "Offers" ]

  const toggleModal = () => {
    setIsModalOpen(false)
  }

  const toggleCartModal = () => {
    setIsCartModalOpen(false)
  }


  return (

    <nav className="w-full h-auto text-text">

      <div className="flex justify-between items-center px-[4%] w-full h-20">
        <Link href={'/'}>
        <p className="text-xl font-semibold"> hoodsy </p>

        </Link>
        <div className="flex">
          <div className="flex h-20 w-28 items-center justify-center text-sm font-normal hover:bg-secondary 
           hover:duration-300 hover:ease-in">
            <p> Woman </p>
          </div>
          <div className="flex h-20 w-28 items-center justify-center text-sm font-normal hover:bg-secondary 
            hover:duration-300 hover:ease-in" >
            <p> Man </p>
          </div>
        </div>

        <div className="relative">
          <input 
            className="pl-9 w-[27rem] h-9 placeholder:text-sm placeholder:text-grayLight border
           border-grayLight rounded-md" 
            placeholder="Search for clothes"  
          />
          <IconContext.Provider value={{ className:"absolute top-3 left-3 w-4 h-4" }} >
            <FaSistrix/>
          </IconContext.Provider>
        </div>

        <div className="flex items-center gap-8" >
          <IconContext.Provider value={{ className:"h-5 w-5 text-text" }} > 
            <FaHeart />
          </IconContext.Provider>

          <IconContext.Provider value={{ className:"h-5 w-5 text-text" }} >   
            <FaUser />
          </IconContext.Provider>

        <div className="relative" onClick={() => setIsCartModalOpen(true)} >
          <IconContext.Provider value={{ className:"h-5 w-5 text-text cursor-pointer"}} >
            <FaShoppingCart />
              <div className="absolute bottom-2 left-3 flex justify-center items-center w-5 h-5 rounded-full  text-xs font-normal text-white bg-accent"> 
                { Number(cartCount) } 
              </div>
              </IconContext.Provider>
            </div>
        </div>

        <button className="w-40 h-9 text-sm text-white bg-secondary" onClick={() => setIsModalOpen(true) } >
          Sign in
        </button>
      </div>

      <div className="flex items-center px-[4%] w-full h-12 bg-darkBackground text-white">
        { categories.map( (category, index) => (
          <div key={ index } className="flex justify-center items-center w-36 h-12 cursor-pointer hover:bg-secondary hover:ease-in hover:duration-300" >  
            <p className="text-sm "> { category }</p>
          </div>
        ))}
      </div>

      {
        isModalOpen && (
          <LoginModal 
            toggleModal = { toggleModal }
          />
        )
      }

      {
        isCartModalOpen && (
          <CartModal 
            toggleCartModal={ toggleCartModal }
          />
        )
      }  
        
    </nav>
  )
}

export default Navbar
