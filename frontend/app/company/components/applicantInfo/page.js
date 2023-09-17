"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';

export default function applicantInfo () {
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object

    const dummyApplicant = [
      {
        name: 'John Doe',
        university: 'johndoe@gmail.com',
        skills: 'Python, Java, C++',
      },
      {
        name: 'Alice Smith',
        age: 'University of Michigan',
        skills: 'Python, Java, C++',
      },
      {
        name: 'John Doe',
        age: 'johndoe@gmail.com',
        skills: 'Python, Java, C++',
      },
      {
        name: 'John Doe',
        age: 'johndoe@gmail.com',
        skills: 'Python, Java, C++',
      },
    ]
      // Add more job items as needed
    ;

    setApplicant(dummyApplicant);
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {applicant ? 
      <div className='flex flex-col items-center justify-between p-24'>
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Name: John Doe</strong></p>
             <p><strong>Email: johndoe@gmail.com</strong></p>
             <p><strong>Skills: Python, Java, C++</strong> </p>
            </div>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Name: Alice Smith</strong></p>
             <p><strong>Email: alicesmith@gmail.com</strong></p>
             <p><strong>Skills: C, Haskell, C++</strong> </p>
            </div>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Name: Adam Johnson</strong></p>
             <p><strong>Email: adamjohnson@gmail.com</strong></p>
            </div>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Name: Lucas Williams</strong></p>
             <p><strong>Email: lucaswilliams@gmail.com</strong></p>
             <p><strong>Skills: Python, Java, C++</strong> </p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

