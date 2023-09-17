"use client"
import Navbar from '../Navbar';
import React, { useEffect, useState } from 'react';

export default function HiredApplicantInfo () {

  return (
    <main>
    <Navbar></Navbar>
    <div>
      <div className='flex flex-col items-center justify-between p-24'>
        <div className='relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl p-40 group'>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
              <p><strong>Name: John Doe</strong> </p>
              <p><strong>Age: 20</strong> </p>
              <p><strong>Skills: Python, Java, C</strong> </p>
            </div>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
              <p><strong>Name: Alice Smith</strong> </p>
              <p><strong>Age: 18</strong> </p>
              <p><strong>Skills: Haskell, C++, Docker</strong> </p>
            </div>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
              <p><strong>Name: Adam Johnson</strong> </p>
              <p><strong>Age: 24</strong> </p>
              <p><strong>Skills: Javascript, Kuberneter, Docker</strong> </p>
            </div>
            <div className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
              <p><strong>Name: Lucas Williams</strong> </p>
              <p><strong>Age: 25</strong> </p>
              <p><strong>Skills: Golang, Typescript, React.js</strong> </p>
            </div>
        </div>
        {/* Add more user details here */}
    </div> 
    </div>
    </main>
  );
};

