"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function JobInfo () {
  const [jobInfo, setJobInfo] = useState(null);
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  const callAPI = async () => {
    const response = await axios.get('https://9d780f6f-8fe3-4416-9c81-a14f9916ef8c.mock.pstmn.io/api/v1/jobs/' + id);
    console.log(response.data);
    setJobInfo(response.data);
  }

  useEffect(() => {
    callAPI();
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
             <p><strong>Description:</strong> {jobInfo.description}</p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

