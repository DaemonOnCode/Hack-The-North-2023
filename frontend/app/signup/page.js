"use client"
import { useState } from 'react';
import Link from "next/link";

export default function Signup() {

    // States for registration
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyBlockchainWalletId, setCompanyBlockchainWalletId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // States for checking the errors
    // Handling the name change
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

     // Handling the company change
     const handleCompanyName = (e) => {
        setCompanyName(e.target.value);
    };

     // Handling the blockchain change
     const handleCompanyBlockchainWalletId = (e) => {
        setCompanyBlockchainWalletId(e.target.value);
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://1a305f54-91aa-4b02-9176-457b54a2711e.mock.pstmn.io/api/v1/accounts/recruiters/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ firstName, lastName, email, password, companyName, companyBlockchainWalletId }),
            });
      
            if (response.ok) {
              // Signup was successful, you can redirect the user or show a success message
              console.log('Signup successful');
            } else {
              // Handle signup errors
              console.error('Signup failed');
              console.log(response.json())
            }
          } catch (error) {
            console.log('An error occurred', error);
          }

    };

    return (
    <form onClick={handleSubmit}>
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Sign Up Page</h1>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              First Name
            </label>
            <input onChange={handleFirstName}
              type="text"
              className="input block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={firstName}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Last Name
            </label>
            <input onChange={handleLastName}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                value={lastName}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input onChange={handleEmail}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input onChange={handlePassword}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Company Name
            </label>
            <input onChange={handleCompanyName}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={companyName}
            />
          </div>
          <div className="mb-2">
            <label
              className="block text-sm font-semibold text-gray-800"
            >
              Company Blockchain Wallet ID
            </label>
            <input
              type="text" onChange={handleCompanyBlockchainWalletId}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={companyBlockchainWalletId}
            />
          </div>

          <div className="mt-2">
            <button type="submit"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-violet-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign Up
            </button>
          </div>
      </div>
    </div>
    </form>
    );
}





