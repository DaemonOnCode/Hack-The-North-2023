"use client"
import Navbar from '../Navbar';
import React, { useState } from 'react';
import JobInfo from '../jobInfo/page';

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log(formData);
  };

  return (
    <main>
    <Navbar></Navbar>

    <JobInfo></JobInfo>

    <form onSubmit={handleSubmit} className='mx-28 py-9'>
      <div className="mb-4">
        <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
          Resume
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border rounded-md focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Application
        </button>
      </div>
    </form>
    </main>
  );
};

export default JobApplicationForm;
