"use client"
import Navbar from '../Navbar';
import React, {useEffect, useState} from 'react';

export default function ApplicantInfo() {
  const [applicant, setApplicant] = useState(null);

    useEffect(() => {
        // Fetch user data from API
        // For demonstration purposes, I'll use a dummy user object

    const dummyApplicant =
    {
      name: 'John Doe',
      age: 'johndoe@gmail.com',
      skills: 'Python, Java, C++',
    }
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
            <div
              className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
              <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
                <p><strong>Name:</strong> {applicant.name}</p>
                <p><strong>Age:</strong> {applicant.age}</p>
                <p><strong>Skills:</strong> {applicant.skills}</p>
              </div>
            </div>
            {/* Add more user details here */}
          </div> : <p>Loading...</p>}
      </div>
    </main>
  );
};

