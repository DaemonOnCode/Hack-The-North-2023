"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../../../context/userContext';
import SearchBar from '../searchbar';
import axios from 'axios';

export default function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [filters, setFilters] = useState([]);

  const userContext = useContext(UserContext);
  const headers = { "Authorization": "Token " + userContext.user.auth_token };

  const callAPI = async () => {
    const [applicantResponse, filterResponse] = await Promise.allSettled(axios.get('https://api.onehirehub.tech/v1/jobs', { "headers": headers }), axios.get('https://api.onehirehub.tech/v1/filters', { "headers": headers }));
    setApplicants(applicantResponse.value.data);
    setFilters(filterResponse.value.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  const handleChange = async (e) => {
    console.log(e.target.value);
    const response = await axios.get('https://api.onehirehub.tech/v1/jobs', { "headers": headers })
    setApplicants(response.data);
  }

  return (
    <main>
      <Navbar></Navbar>
      <div>
        {applicants ?
          <div className='px-3 py-16'>
            <SearchBar values={filters.map((filter) => { return { id: filter.id, name: filter.display_prompt } })} className='px-3 py-6' onClick={handleChange} searchbarTitle="Filter by" />
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

