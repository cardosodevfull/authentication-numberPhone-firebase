"use client";
import React, { useContext } from 'react';
import withAuth from '../../config/withAuth';
import { AppContext } from '../../context/';

function Dashboard() {    
    const { user, logout } = useContext(AppContext);
    return (
        <>
        <h1>Dashboard olá - {user.slice(3,14)}</h1>
        <a href='#' onClick={()=> logout()}>sair do aplicativo</a>
        </>
    )
}

export default withAuth(Dashboard);