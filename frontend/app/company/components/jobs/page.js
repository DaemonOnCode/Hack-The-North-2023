"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState, useContext } from 'react';
import JobItem from '../JobItem';
import axios from 'axios';
import SearchBar from '../searchbar';
import { UserContext } from '../../../../app/context/userContext';

export default function Jobs(props) {
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

  const handleChange = (e) => {
    console.log(e.target.value)

  }

  return (
    <main>
      <Navbar></Navbar>
      <div>
        {jobs ?
          <div className='px-3 py-16'>
            <SearchBar values={jobs.map((job) => { return { id: job.id, name: job.title } })} className='px-3 py-6' onClick={handleChange} />
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

