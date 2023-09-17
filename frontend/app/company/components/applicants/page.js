"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Applicants () {
  const [applicants, setApplicants] = useState(null);
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  const callAPI = async () => {
    const response = await axios.get('https://9d780f6f-8fe3-4416-9c81-a14f9916ef8c.mock.pstmn.io/api/v1/jobs/applications/' + id);
    console.log(response.data);
    setApplicants(response.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {applicants ? 
        <div className='px-3 py-16'>
        <div className='grid sm:grid grid-cols-1 gap-8 mt-20 p-10'>
            {applicants.map((applicant, index) => (
            <div
                key={index}
            >
            <div className='relative flex items-center justify-center h-auto bg-gray-200 rounded-xl p-7 group'>
                <div className=''>
                    <h3 className='text-2xl text-center'>{applicant.user.first_name}</h3>
                    <br />
                    <p className='pt-2 text-center'>{applicant.user.last_name}</p>
                    <div className='w-70 grid grid-cols-3'>
                        <Link href={applicant.applicantInfoURL}>
                            <p className='mt-10 mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Applicant Info</p>
                        </Link>
                        <Link href={applicant.verifyURL}>
                            <p className='mt-10 mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Verify</p>
                        </Link>
                        <Link href={applicant.hireURL}>
                            <p className='mt-10 mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Hire</p>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
            ))}
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

