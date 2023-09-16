"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';
import ApplyJobItem from '../ApplyJobItem';

export default function JobOpenings () {
  const [jobOpenings, setJobOpenings] = useState([]);

  useEffect(() => {
    // Fetch user data from API
    // For demonstration purposes, I'll use a dummy user object
    const dummyJobOpenings = [
        {
          title: 'Software Engineer',
          location: 'Toronto, ON',
          applyJobURL: '/candidate/components/applyJob',
        },
        {
          title: 'Data Analyst',
          location: 'Toronto, ON',
          applyJobURL: '/candidate/components/applyJob',
        },
        {
            title: 'Data Scientist',
            location: 'Toronto, ON',
            applyJobURL: '/candidate/components/applyJob',
          },
          {
            title: 'Designer',
            location: 'Toronto, ON',
            applyJobURL: '/candidate/components/applyJob',
          },
        // Add more job items as needed
      ];

      setJobOpenings(dummyJobOpenings);
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
            <ApplyJobItem title={jobOpening.title} applyJobURL={jobOpening.applyJobURL} location = {jobOpening.location}></ApplyJobItem>
            </div>
            ))}
        </div>
        {/* Add more user details here */}
    </div> : <p>Loading...</p>}
    </div>
    </main>
  );
};

