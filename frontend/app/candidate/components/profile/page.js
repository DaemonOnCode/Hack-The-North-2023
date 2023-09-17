"use client"
import Navbar from '../Navbar';
import React, {useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

export default function Profile () {
  const usercontext = useContext(UserContext);

  const user = usercontext.user

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {user ? 
      <div className='flex flex-col items-center justify-between p-24'>
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
             <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

