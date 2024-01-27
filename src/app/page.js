"use client";
import { useContext } from 'react';
import { AppContext } from '../context/';

export default function Page() {
    const {user} = useContext(AppContext);
    return <h1>Hello, {user}</h1>
}