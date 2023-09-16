"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Applicants () {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object

    const dummyApplicants = [
        {
          name: 'John Doe',
          school: 'University of Toronto',
          applicantInfoURL: '/company/components/applicantInfo',
        },
        {
            name: 'Alice Smith',
            school: 'University of Michigan',
            applicantInfoURL: '/company/components/applicantInfo',
        },
        {
            name: 'Adam Johnson',
            school: 'University of Waterloo',
          applicantInfoURL: '/company/components/applicantInfo',
          },
          {
            name: 'Lucas Williams',
          school: 'University of British Columbia',
          applicantInfoURL: '/company/components/applicantInfo',
          },
        // Add more applicants as needed
      ];

    setApplicants(dummyApplicants);
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
                    <h3 className='text-2xl text-center'>{applicant.name}</h3>
                    <br />
                    <p className='pt-2 text-center'>{applicant.school}</p>
                    <div className='grid grid-cols-1'>
                        <Link href={applicant.applicantInfoURL}>
                            <p className='mt-10 mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Applicant Info</p>
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

