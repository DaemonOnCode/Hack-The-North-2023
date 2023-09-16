"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';

export default function HiredApplicantInfo () {
  const [hiredApplicantInfo, setHiredApplicantInfo] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object

    const dummyHiredApplicantInfo = 
      {
        name: 'John Doe',
        age: 'johndoe@gmail.com',
        skills: 'Python, Java, C++',
      }
      // Add more job items as needed
    ;

    setHiredApplicantInfo(dummyHiredApplicantInfo);
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {hiredApplicantInfo ? 
      <div className='flex flex-col items-center justify-between p-24'>
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Name:</strong> {hiredApplicantInfo.name}</p>
             <p><strong>Age:</strong> {hiredApplicantInfo.age}</p>
             <p><strong>Skills:</strong> {hiredApplicantInfo.skills}</p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

