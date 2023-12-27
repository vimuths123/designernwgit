'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { login } from '../../utils/auth';

const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Call the login API with username and password
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + 'auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.data) {
                login(responseData.data.token)
                router.push('/payment');
            } else {
                setError('Error happend. Please contact Admin')
            }
        } else {
            const responseData = await response.json();
            if (responseData && responseData.error) {
                setError(responseData.error)
            }
        }
    };

    return (
        <>
            <main className="flex-1">
                <div className="flex justify-center mt-6 pt-6">
                    <Image src="/images/logo.png" width={120} height={200} alt="Logo" className="h-auto" />
                </div>
                <div className="flex justify-center mt-4">
                    <h1>Sign Up</h1>
                </div>

                <div className="flex items-center justify-center mt-8">
                    {/* Left section */}
                    <div className="p-4">
                        <div className='pr-6 w-96'>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                                Email Address
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="block border border-gray-300 rounded-md p-2 w-full text-base"
                            />

                            <div className='flex justify-between mt-4'>
                                <label htmlFor="password" className="text-sm font-medium text-gray-600 mb-1">
                                    Password
                                </label>
                                <button onClick={togglePasswordVisibility} className="cursor-pointer text-sm font-medium text-gray-600 mb-1">
                                    <Image src="/images/iconshowhide.png" width={20} height={20}
                                        alt="Hide" className="h-auto inline mr-0.5" />
                                    <span>{showPassword ? 'Hide' : 'Show'}</span>
                                </button>
                            </div>

                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                className="block border border-gray-300 rounded-md p-2 w-full"
                            />

                            <button className="rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-8 w-full">
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Divider (vertical line) */}
                    <Image src="/images/divider.png" width={18} height={200}
                        className='h-auto'
                        alt="Vertical Line" objectFit="cover" />

                    {/* Right section */}
                    <div className="p-4 ">
                        <div className='pl-6 w-96'>
                            <button className="rounded-full social_btn py-2 px-4 w-full">
                                <Image src="/images/google.png" width={20} height={20}
                                    alt="Hide" className="h-auto inline mr-2 mb-1" />
                                <span>Continue with Google</span>
                            </button>
                            <button className="rounded-full social_btn py-2 px-4 mt-4 w-full">
                                <Image src="/images/facebook.png" width={20} height={20}
                                    alt="Hide" className="h-auto inline mr-2 mb-1" />
                                <span>Continue with Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <p>Already have an account? <a className='text-blue-500'>Sign In</a></p>
                </div>


            </main>
        </>
    )
}

export default Page;