"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';

export default function JobInfo () {
  const [jobInfo, setjobInfo] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object

    const dummyJobInfo = 
      {
        title: 'Software Engineer',
        location: 'Toronto, ON',
        yearsOfExperience: '3',
        description: 'We are looking for a software engineer to join our team.',
      }
      // Add more job items as needed
    ;

    setjobInfo(dummyJobInfo);
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {jobInfo ? 
      <div className='flex flex-col items-center justify-between p-24'>
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
            <p><strong>Title:</strong> {jobInfo.title}</p>
             <p><strong>Location:</strong> {jobInfo.location}</p>
             <p><strong>Years of Experience:</strong> {jobInfo.yearsOfExperience}</p>
             <p><strong>Description:</strong> {jobInfo.description}</p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

