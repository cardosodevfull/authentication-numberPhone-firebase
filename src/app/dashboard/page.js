"use client";
import React, { useContext } from 'react';
import withAuth from '../../config/withAuth';
import { AppContext } from '../../context/';

function Dashboard() {
    const { user, logout } = useContext(AppContext);
    return (
        <div className='flex flex-wrap justify-center items-center min-h-80'>
            <div className='max-w-60 text-center'>
                {user ? <>
                    <h1 className='text-3xl text-gray-500 mb-5 font-bold'>Cliente number: {user && user.slice(3, 14)}</h1>
                    <a className='text-1xl text-red-500 mb-5 font-bold underline' href='#' onClick={() => logout()}>sair do aplicativo</a>
                </> :
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full"></div>
                    </div>}
            </div>
        </div>
    )
}

export default withAuth(Dashboard);