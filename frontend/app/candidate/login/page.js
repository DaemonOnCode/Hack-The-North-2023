"use client"
import Link from "next/link";
import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function Login () {

  const router = useRouter()
  // States for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const usercontext = useContext(UserContext);

  // Handling the email change
  const handleEmail = (e) => {
      setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e) => {
      setPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
      e.preventDefault();

    try {
      const response = await axios.post('https://9d780f6f-8fe3-4416-9c81-a14f9916ef8c.mock.pstmn.io/api/v1/accounts/candidates/login/', {
        email,
        password,
      });

        if (response.status === 200) {
          // Signup was successful, you can redirect the user or show a success message
          console.log('Login successful');

          usercontext.setUser(response.data)
          router.push("/candidate/components/profile")

        } else {
          // Handle signup errors
          console.error('Login failed');
        }
      } catch (error) {
        console.log('An error occurred', error);
      }

  };

  return (
    <form>
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Login Page</h1>
        <form className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input onChange={handleEmail}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input onChange={handlePassword}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button onClick={handleSubmit}
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-violet-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href="/candidate/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
      <div className="mt-2">
        <button
          type="submit"
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-violet-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

