"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import JobItem from '../JobItem';

export default function Jobs () {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object
    const jobItems = [
        {
          title: 'Software Engineer',
          jobInfoURL: '/company/components/jobInfo',
          numberOfApplicants: '3',
          status: 'Open',
          applicantsURL: '/company/components/applicants',
        },
        {
          title: 'Data Analyst',
          jobInfoURL: '/company/components/jobInfo',
          numberOfApplicants: '2',
          status: 'Closed',
          applicantsURL: '/company/components/applicants',
        },
        {
            title: 'Data Scientist',
            jobInfoURL: '/company/components/jobInfo',
            numberOfApplicants: '4',
            status: 'Closed',
            applicantsURL: '/company/components/applicants',
          },
          {
            title: 'Designer',
            jobInfoURL: '/company/components/jobInfo',
            numberOfApplicants: '5',
            status: 'Open',
            applicantsURL: '/company/components/applicants',
          },
        // Add more job items as needed
      ];

    setJobs(jobItems);
  }, []);

  return (
    <main>
    <Navbar></Navbar>
    <div>
      {jobs ? 
        <div className='px-3 py-16'>
        <div className='grid sm:grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 p-10'>
            {jobs.map((job, index) => (
            <div
                key={index}
            >
            <JobItem title={job.title} jobInfoURL={job.jobInfoURL} numberOfApplicants={job.numberOfApplicants} status = {job.status} applicantsURL={job.applicantsURL}></JobItem>
            </div>
            ))}
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

