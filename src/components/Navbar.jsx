import React from 'react'

const Navbar = () => {
  return (
    <nav className="block px-4 mx-auto text-white bg-slate-900 shadow-md  lg:px-8 lg:py-3 ">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-gray-100">
            <a href="#" className="mr-4 block cursor-pointer py-1.5 text-2xl text-gray-200 font-semibold">
                Taskify
            </a>
            <div className="hidden lg:block">
            </div>
        </div>
    </nav>
  )
}

export default Navbar