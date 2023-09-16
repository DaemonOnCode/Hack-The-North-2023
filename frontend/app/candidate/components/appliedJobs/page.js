"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AppliedJobs () {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object

    const dummyAppliedJobs = [
        {
          title: 'Software Engineer',
          location: 'Toronto, ON',
          jobInfoURL: '/candidate/components/jobInfo',
          status: 'Open',
          applied: 1,
        },
        {
          title: 'Data Analyst',
          location: 'Toronto, ON',
          jobInfoURL: '/candidate/components/jobInfo',
          status: 'Open',
          applied: 0,
        },
        {
            title: 'Data Scientist',
            location: 'Toronto, ON',
            jobInfoURL: '/candidate/components/jobInfo',
          status: 'Closed',
          applied: 1,
          },
          {
            title: 'Designer',
            location: 'Toronto, ON',
            jobInfoURL: '/candidate/components/jobInfo',
          status: 'Closed',
          applied: 0,
          },
        // Add more job items as needed
      ];

      setAppliedJobs(dummyAppliedJobs);
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {appliedJobs ? 
        <div className='px-3 py-16'>
        <div className='grid sm:grid grid-cols-1 gap-8 mt-20 p-10'>
            {appliedJobs.map((appliedJob, index) => (
            <div
                key={index}
            >
            <div className='relative flex items-center justify-center h-auto bg-gray-200 rounded-xl p-7 group'>
                <div className=''>
                    <h3 className='text-2xl text-center'>{appliedJob.title}</h3>
                    <br />
                    <p className='pt-2 text-center'>{appliedJob.location}</p>
                    <p className='pt-2 text-center'>Status: {appliedJob.status}</p>
                    <div className='w-40 items-center justify-center'>
                        <Link href={appliedJob.jobInfoURL}>
                            <p className='mt-5 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer'>Job Info</p>
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

