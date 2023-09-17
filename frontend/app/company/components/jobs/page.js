"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState, useContext } from 'react';
import JobItem from '../JobItem';
import axios from 'axios';
import { UserContext } from '../../../../app/context/userContext';

export default function Jobs() {
  const [jobs, setJobs] = useState(null);

  const userContext = useContext(UserContext);

  const callAPI = async () => {
    let headers = { "Authorization": "Token " + userContext.user.auth_token };
    const response = await axios.get('https://api.onehirehub.tech/v1/jobs', { "headers": headers });
    setJobs(response.data);
  }

  useEffect(() => {
    callAPI();
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
                  <JobItem {...job} ></JobItem>
                </div>
              ))}
            </div>
            {/* Add more user details here */}
          </div> : <p>Loading...</p>}
      </div>
    </main>
  );
};

