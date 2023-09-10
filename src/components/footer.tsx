import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-grayDark rounded-lg shadow m-4 dark:bg-gray-800">
    <div className="w-full mx-auto flex flex-col md:flex-row items-center max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm m-3 text-white sm:text-center dark:text-gray-400">© 2023 <a href="" className="hover:underline">hoodsy</a>. All Rights Reserved.</span>
    <span className="text-sm p-3 text-white sm:text-center dark:text-gray-400">Developed by c13-42-ft-node-react</span>
    <ul className="flex flex-col text-center justify-center lg:flex-row lg:flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>
  )
}

export default Footer