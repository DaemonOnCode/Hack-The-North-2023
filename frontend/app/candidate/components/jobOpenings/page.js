"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplyJobItem from '../ApplyJobItem';

export default function JobOpenings () {
  const [jobOpenings, setJobOpenings] = useState(null);
  
  const callAPI = async () => {
    const response = await axios.get('https://9d780f6f-8fe3-4416-9c81-a14f9916ef8c.mock.pstmn.io/api/v1/jobs');
    console.log(response.data);
    setJobOpenings(response.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {jobOpenings ? 
        <div className='px-3 py-16'>
        <div className='grid sm:grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 p-10'>
            {jobOpenings.map((jobOpening, index) => (
            <div
                key={index}
            >
            <ApplyJobItem {...jobOpening}></ApplyJobItem>
            </div>
            ))}
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

