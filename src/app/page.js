"use client";
import { useContext } from 'react';
import { AppContext } from '../context/';
import Link from 'next/link'

export default function Page() {
    const {user} = useContext(AppContext);
    return (
        <>
        <h1>Hello, {user}</h1>
        <Link href="/dashboard">Dashboard</Link>
        </>
    );
}