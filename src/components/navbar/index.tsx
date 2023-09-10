"use client"

import { useState, createContext, useEffect } from "react"
import { IconContext } from "react-icons"
import { FaShoppingCart, FaHeart, FaSistrix, FaUser } from "react-icons/fa"
import LoginModal from "../loginModal"
import Link from "next/link"
import { AiOutlineMenu } from "react-icons/ai"
import SearchProducts from "../searchProducts"
import { Product } from "@prisma/client"
import { signOut, useSession } from "next-auth/react"
import CartModal from "../cartModal"

let init: any = 'any'
export const SearchContext = createContext(init);

const Navbar = ( { products, category }: { products: Product[], category: any|undefined } ) => {
  const [searchModal, setSearchModal] = useState<boolean>(false)
  

  const { data: session, status } = useSession()





  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false)



  const categories: string[]= ["All", "American Football", "Baseball", "Basketball", "Football", "Lifestyle", "Running", "Soccer"] 


  const toggleCartModal = () => {
    setIsCartModalOpen(false)
  }
  const toggleModal = () => {    
    setIsModalOpen(false)
  }
  const menuModal = () => {
    setMenu(true)
  }
  const cerrarMenu = () => {
    setMenu(false)
  }
  const handleSearch = () => {
    setSearchModal(!searchModal)
  }

  return (
    <SearchContext.Provider value={{ setSearchModal }}>
    <nav className="w-full text-text sticky justify-center top-0 z-10 bg-white flex flex-col h-auto border-2 border-solid border-whiteLight transition-all lg:border-none">

      <div className="flex justify-between items-center px-[4%] w-full h-20">
        <button className="flex lg:hidden" onClick={menuModal}><AiOutlineMenu /></button>

        <Link href={'/'}>
        <p className="text-xl font-semibold"> hoodsy </p>
        </Link>
        <div className="hidden lg:flex">
          
        </div>

        <div className="relative hidden lg:flex">
          <SearchProducts products={products}/>
          <IconContext.Provider value={{ className:"absolute top-3 left-3 w-4 h-4" }} >
            <FaSistrix/>
          </IconContext.Provider>
        </div>

        <div className="flex items-center gap-8" >
          <div onClick={handleSearch}>
            <IconContext.Provider  value={{ className:"flex lg:hidden w-4 h-16" }} >
              <FaSistrix/>
            </IconContext.Provider>
          </div>
          {
          session?.user &&  status == "authenticated" 
          ?
          <>
          <IconContext.Provider value={{ className:"h-5 w-5 text-text hidden md:block" }} > 
            <FaHeart />
          </IconContext.Provider>

          <Link className=" hidden md:block" href={session?.user.is_admin ? "/admin/dashboard" : (`/user/${session?.user.id}`)}>
          <IconContext.Provider value={{ className:"h-5 w-5 text-text" }} >   
            <FaUser />
          </IconContext.Provider>

          </Link>
          </>
          : 
          null
        }
          <div className="relative hidden md:block" onClick={() => setIsCartModalOpen(true)}>
            <IconContext.Provider value={{ className:"h-5 w-5 text-text"}} >
            <FaShoppingCart />
            
            </IconContext.Provider>
          </div>

          <Link href={'/cart'} className=" block md:hidden">
          <IconContext.Provider value={{ className:"h-5 w-5 text-text"}} >
            <FaShoppingCart />
            
            </IconContext.Provider>
          </Link>
        </div>

        {
         status == 'unauthenticated' || status === 'loading'
         ?
          <button className="rounded-md w-40 h-9 text-sm text-white bg-secondary" onClick={() => setIsModalOpen(true) } >
          Sign in
        </button>
        : 
        <button className="rounded-md w-40 h-9 text-sm text-white bg-secondary" onClick={() => signOut() } >
          Sign out
        </button>
        
        }
      </div>

      <div className="hidden lg:flex items-center px-[4%] w-full h-auto bg-darkBackground text-white">
        { categories.map( (item, index) => (
          <Link href={`${item}`} key={ index } className={`flex justify-center items-center w-36 h-12 cursor-pointer ${category == item ? 'bg-favoriteGold': '' } hover:bg-favoriteGold hover:ease-in hover:duration-300`} >  
          <p className="text-sm text-center"> { item }</p>
          </Link>
        ))}
      </div>        
    </nav>
    {
      isModalOpen && (
        <LoginModal 
          toggleModal = { toggleModal }
        />
      )
    }
    {
      menu && (
        <div className="w-full h-screen fixed z-10 bg-white top-0 items-center justify-center">
            <div className="w-full relative justify-center items-center py-4 flex border-b-2 border-solid border-whiteLight">
              <Link href={'/'}>
                <p className="text-xl font-semibold"> hoodsy </p>
              </Link>
              <button className="absolute right-4" onClick={cerrarMenu}>Cerrar</button>

            </div>
          
          <div className="flex justify-center items-center py-4">
          {
          session?.user &&  status == "authenticated" 
          ?
          <>
          <IconContext.Provider value={{ className:"h-5 w-5 text-text" }} > 
            <FaHeart />
          </IconContext.Provider>

          <Link href={session?.user.is_admin ? "/admin/dashboard" : (`/user/${session?.user.id}`)}>
          <IconContext.Provider value={{ className:"h-5 w-5 text-text" }} >   
            <FaUser />
          </IconContext.Provider>

          </Link>
          </>
          : 
          null
        }
          </div>
          
          <div className="flex flex-col items-start w-full h-auto bg-darkBackground text-white">
        
          { categories.map( (category, index) => (            
            <Link href={`/${category}`} key={ index } onClick={cerrarMenu} className="flex px-8 justify-start items-center w-full py-4 cursor-pointer hover:bg-favoriteGold hover:ease-in hover:duration-300" >  
              <p className="text-sm "> { category }</p>
            </Link>
          ))}
          </div>
        </div>
      )
    }
    {
      searchModal && (
        <div className="w-full h-screen fixed top-0 z-10 bg-whiteLight flex ">
          <div className="flex w-full justify-around h-16 items-center border-b-2 border-solid border-grayLightSoft">
          <Link href={'/'}>
          <p className="text-xl font-semibold"> hoodsy </p>
          </Link>
          <div className="relative">
          <SearchProducts products={products}/>
            <IconContext.Provider value={{ className:"absolute top-3 left-3 w-4 h-4" }} >
              <FaSistrix/>
          </IconContext.Provider>
          </div>
          <button onClick={handleSearch}>cerrar</button>
          </div>
        </div>
      )
    }
    {
        isCartModalOpen && (
          <CartModal 
            user={session?.user}
            toggleCartModal={ toggleCartModal }
          />
        )
      }
    </SearchContext.Provider>
  )
}

export default Navbar
