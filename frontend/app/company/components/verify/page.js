"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';

export default function Verify () {
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object

    const dummyVerify = 
      {
        name: 'John Verify',
        email: 'johndoe@gmail.com',
      }
      // Add more job items as needed
    ;

    setVerify(dummyVerify);
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {verify ? 
      <div className='flex flex-col items-center justify-between p-24'>
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Name:</strong> {verify.name}</p>
             <p><strong>Email:</strong> {verify.email}</p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

