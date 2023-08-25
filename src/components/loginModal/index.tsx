"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { IconContext } from "react-icons"
import { FaEye, FaEyeSlash, FaRegTimesCircle } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"


interface toggleFunction {
  toggleModal: () => void
}


const LoginModal = ({ toggleModal }: toggleFunction) => {

  const [inputMail, setInputMail] = useState<string>("")
  const [toggleLogin, setToggleLogin] = useState<boolean>(false)

  return (

    <div className='absolute top-0 left-0 z-20 flex justify-center items-center w-full h-full bg-modalBackground'>
        <div className='relative w-[37rem] h-[32rem] bg-grayLightSoft'>
            <div className='mt-6 flex justify-center' >
                

                <button 
                  className='w-32 h-7 text-xs text-black border-b border-b-grayLight' 
                  onClick={() => setToggleLogin(true)  }
                > Sign in </button>
            </div>

            <div onClick={ toggleModal }>
              <IconContext.Provider value={{ className:"absolute top-4 right-5 w-5 h-5 cursor-pointer" }} >
                <FaRegTimesCircle />
              </IconContext.Provider>
            </div>
            
            <h2 className="mt-4 text-lg font-semibold text-text text-center">  
              { "Sign in" }
            </h2>
            <p className="mb-5 text-[0.75rem] font-light text-text text-center"> 
              { toggleLogin ?  "Create an account to receive discounts and offers " : "Discover new and trendy products" } 
            </p>

            <form className="mx-[6%] flex flex-col justify-center" >
              <label className="text-xs font-medium text-text"> Email* </label> <br/>
              <input 
                className="mb-4 pl-4 w-[33.4rem] h-9 border border-grayLight bg-white rounded-md placeholder:text-sm placeholder:text-gray-400" 
                type="email" 
                placeholder="Your email" 
                value={ inputMail }
                onChange={(e) => setInputMail(e.target.value)}
              />

              
              {/* Disabled  */}
              <button disabled={true} onClick={()=>{signIn('email', {inputMail})}} className="w-[33.4rem] h-10 bg-darkBackground text-sm font-medium text-white rounded-md"> 
                { toggleLogin ? "Sign in" : "Sign In" }   
              </button>
            </form>

            <div className="flex justify-center items-center my-4 mx-[6%]">
              <p className="font-medium text-text" > or </p>
            </div>

            <button onClick={()=>{signIn('google')}} className="flex justify-center items-center mx-[6%] w-[33.4rem] h-10 text-sm text-text bg-white border border-grayLight rounded-md ">
              <p className="mr-3 text-sm font-medium text-text"> 
                { toggleLogin ? "Register with" : "Sign In with" } 
              </p>
              <IconContext.Provider value={{ className:"w-4 h-4" }} >
                <FcGoogle/>
              </IconContext.Provider>
            </button>

            { toggleLogin && (
                <p className="mt-8 text-xs font-light text-text text-center"> By creating and account you accept
                  <span className="text-accent"> terms and conditions </span> 
                </p>
              )
            }
        </div>
    </div>
  )
}

export default LoginModal
