import React from 'react'
import BackIconPath from '../../assets/back.svg';
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';

const MyProfile = () => {
  return (
    <div className=' px-10'>
        <div className='flex items-center justify-center my-6'>
        <h4 className=' text-2xl'>
            My Profile
        </h4>
        </div>

        <div className='flex flex-col gap-6 text-lg'>

            {/* Breadcrumb div */}
            <div className='flex'>
                <Link to="/phase-one">
                    <h5 className='underline'>Main Page</h5>
                </Link>
                <img src={BackIconPath} width='24px' height='24px'/>
                <h5>My Profile</h5>
            </div>

            <div className='grid gap-10 justify-items-stretch'>
                {/* Placeholder for user info */}
                <div className='grid grid-cols-3 px-4'>
                    {/* First Name */}
                    <div className='flex flex-col px-10 gap-4'>
                        <h5 className='text-xl font-bold'>First Name</h5>
                        <p>User First Name</p>
                    </div>

                    {/* Last Name */}
                    <div className='flex flex-col px-10 gap-4'>
                        <h5 className='text-xl font-bold'>Last Name</h5>
                        <p>User Last Name</p>
                    </div>

                    {/* Email */}
                    <div className='flex flex-col px-10 gap-4'>
                        <h5 className='text-xl font-bold'>Email</h5>
                        <p>example@gmail.com</p>
                    </div>
                </div>

                {/* Placeholder for user info - modifiable */}
                <div className='grid grid-cols-3 px-4'>

                    {/* Current Password */}
                    <div className='flex flex-col px-10 gap-4'>
                        <h5 className='text-xl font-bold'>Current Password <span className=' text-red-600'>*</span></h5>
                        <input 
                            type="password"
                            className='border border-[#707070] rounded-lg w-1/2'
                        />
                        <p>Forgot your password ? <span className=' text-blue-500 underline'>Reset Password</span></p>
                    </div>

                    {/* New Password */}
                    <div className='flex flex-col px-10 gap-4'>
                        <h5 className='text-xl font-bold'>New Password</h5>
                        <input 
                            type="password"
                            className='border border-[#707070] rounded-lg w-1/2'
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div className='flex flex-col px-10 gap-4'>
                        <h5 className='text-xl font-bold'>Confirm New Password</h5>
                        <input 
                            type="password"
                            className='border border-[#707070] rounded-lg w-1/2'
                        />
                    </div>
                </div>
                <div className="flex flex-col px-14 gap-4">
                    <button
                        className='bg-[#8AC62D] hover:bg-green-600 text-white py-2 px-2 rounded w-24'
                    >
                    Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyProfile
