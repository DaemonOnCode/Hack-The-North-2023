"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '../../../context/userContext';
import SearchBar from '../searchbar';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [filters, setFilters] = useState([]);

  const searchParams = new useSearchParams()
  const jobId = searchParams.get('id');

  const userContext = useContext(UserContext);
  const headers = { "Authorization": "Token " + userContext?.user?.auth_token };

  const callAPI = async () => {
    const [applicantResponse, filterResponse] = await Promise.allSettled([axios.get('https://api.onehirehub.tech/v1/jobs/', { headers }), axios.get('https://api.onehirehub.tech/v1/ner/analytics-filters/', { headers })]);
    setApplicants(applicantResponse.value.data);
    setFilters(filterResponse.value.data);
  }

  useEffect(() => {
    callAPI();
  }, []);

  const handleChange = async (e) => {
    if (e.target.value === 0) {
      const response = await axios.get('https://api.onehirehub.tech/v1/jobs/', { headers })
      setApplicants(response.data);
      return;
    }
    const response = await axios.post('https://api.onehirehub.tech/v1/ner/filter-applicants', {
      job_id: jobId,
      filters: e.target.value
    }, { headers })
    setApplicants(response.data);
  }

  return (
    <main>
      <Navbar></Navbar>
      <div>
        {applicants ?
          <div className='px-3 py-16'>
            <SearchBar values={[{ id: 0, display_prompt: "" }, ...filters]} className='px-3 py-6' onClick={handleChange} searchbarTitle="Filter by" />
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
                        <Link href={applicant.applicantInfoURL ?? "/"}>
                          <p className='mt-10 mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Applicant Info</p>
                        </Link>
                        <Link href={applicant.verifyURL ?? "/"}>
                          <p className='mt-10 mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Verify</p>
                        </Link>
                        <Link href={applicant.hireURL ?? "/"}>
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

