import Link from 'next/link'

const Navbar = () => {
    return (
        <div className={'fixed w-full h-20 shadow-xl z-[100]'}>
            <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
                <div>
                    <ul style={{color: 'black'}} className="hidden md:flex"> 
                        <li className='ml-10'></li>
                        <Link href='/company/components/profile'>
                            <li className = 'ml-10 text-sm uppercase hover:border-b hover:text-black hover:border-black dark:text-gray-500'>Profile</li>
                        </Link>
                        <Link href='/company/components/jobs'>
                            <li className = 'ml-10 text-sm uppercase hover:border-b hover:text-black hover:border-black dark:text-gray-500'>Jobs</li>
                        </Link>
                        <Link href='/company/components/hiredApplicants'>
                            <li className = 'ml-10 text-sm uppercase hover:border-b hover:text-black hover:border-black dark:text-gray-500'>Hired Applicants</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
