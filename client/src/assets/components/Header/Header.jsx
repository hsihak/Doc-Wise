import React from 'react'
import AccountMenu from '../AccountMenu/AccountMenu'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='flex justify-between items-center border-b-2'>
      <div className=' h-20 flex items-center'>
        <Link to={'/phase-one'}>
          <h1 className='text-3xl font-bold pl-2'>
            <span className='text-[#3CABE0] uppercase'>Doc</span>
            <span className='text-[#F29229] uppercase'>Wise</span>
          </h1>
        </Link>
      </div>
      <div>
        <AccountMenu/>
      </div>
    </div>
  )
}
