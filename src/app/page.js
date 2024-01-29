"use client";
import { useContext } from 'react';
import { AppContext } from '../context/';
import Link from 'next/link'

export default function Page() {
    const { user } = useContext(AppContext);
    return (
        <div className='flex flex-wrap justify-center items-center min-h-80'>
            <div className='max-w-60 text-center'>
                <h1 className="text-3xl text-gray-500 mb-5 font-bold">
                {user ? user : "Authentication" }
                </h1>
                <Link className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full' href="/signin">
                    Entrar com telefone
                </Link>
            </div>
        </div>
    );
}