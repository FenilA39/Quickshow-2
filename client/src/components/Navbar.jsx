import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { Menu, Search, TicketPlus, XIcon } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const navigate = useNavigate()

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5'>
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="" className='w-36 h-auto' />
      </Link>

      <div className={`flex flex-col md:flex-row items-center justify-center gap-8 px-8 py-2 md:rounded-full md:border md:border-white/20 md:bg-[#121d2f]/80 text-white 
        ${isOpen ? 'max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:h-screen max-md:bg-black/80 max-md:z-50 max-md:text-lg' : 'max-md:hidden'}
      `}>
        <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer text-white' onClick={() => setIsOpen(false)} />
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/'>Home</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/movies'>Movies</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/'>Theaters</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/'>Releases</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false) }} to='/favorites'>Favorites</Link>
      </div>

      <div className='flex items-center gap-8'>
        <Search className='max-md:hidden w-6 h-6 cursor-pointer text-white' />
        {
          !user ? (
            <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'>Login</button>
          ) : (
            <UserButton>
                <UserButton.MenuItems>
                    <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')}/>
                </UserButton.MenuItems>
            </UserButton>
          )
        }
      </div>

      <Menu className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer text-white' onClick={() => setIsOpen(true)} />
    </div>
  )
}

export default Navbar
