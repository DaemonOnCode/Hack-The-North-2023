import React from 'react'
import Link from 'next/link'

const JobItem = ({title, jobInfoURL, numberOfApplicants, status, applicantsURL}) => {
    return (
        <div className='relative flex items-center justify-center h-auto bg-gray-200 rounded-xl p-7 group'>
            <div className=''>
                <h3 className='text-2xl text-center'>{title}</h3>
                <br />
                <p className='pt-2 text-center'> Number of Applicants: {numberOfApplicants}</p>
                <p className='pb-4 pt-2 text-center'> Status: {status}</p>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    <Link href={jobInfoURL}>
                        <p className='mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Job Info</p>
                    </Link>
                    <Link href={applicantsURL}>
                        <p className='mx-20 text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Applicants</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default JobItem
