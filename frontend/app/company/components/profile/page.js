"use client"
import Navbar from '../Navbar';
import React, {useContext } from 'react';
import { UserContext } from '@/app/context/UserContext';

export default function Profile () {
  const usercontext = useContext(UserContext);

  console.log(usercontext.user)
    
  const user = usercontext.user

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {user ? 
      <div className='flex flex-col items-center justify-between p-24'>
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>First Name:</strong> {user.first_name}</p>
             <p><strong>Email:</strong> {user.email}</p>
             <p><strong>Company Name:</strong> {user.company.name}</p>
             <p><strong>Blockchain ID:</strong> {user.company.blockchain_wallet_id}</p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

