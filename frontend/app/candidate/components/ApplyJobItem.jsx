import React from 'react'
import Link from 'next/link'

const ApplyJobItem = ({title, description, id}) => {
    return (
        <div className='relative flex items-center justify-center h-auto bg-gray-200 rounded-xl p-7 group'>
            <div className=''>
                <h3 className='text-2xl text-center'>{title}</h3>
                <br />
                <p className='pb-4 pt-2 text-center'>{description}</p>
                <div className='item-center w-40'>
                    <Link href={"/candidate/components/applyJob?id=" + id}>
                        <p className='text-center bg-violet-400 py-3 rounded-lg text-gray-700 font-bold txt-lg cursor-pointer hover:violet'>Apply now!</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ApplyJobItem
