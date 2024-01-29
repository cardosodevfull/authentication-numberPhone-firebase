"use client";
import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/';
import { PatternFormat } from 'react-number-format';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { app } from '../../config/firebaseConfig';
import { useRouter } from 'next/navigation';
import withAuth from '../../config/withAuth';

const auth = getAuth();
auth.languageCode = 'it';

function Signin() {
    const router = useRouter();
    const { user, loading, setLoading, erro, setErro } = useContext(AppContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isVisivel, setIsVisivel] = useState(false);
    const [code, setCode] = useState('');

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible'
        });
    }

    async function requestOTP(e) {
        e.preventDefault();
        setLoading(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier
        await app.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                setLoading(false);
                setIsVisivel(true);
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                setLoading(false);
                setErro(error.message);
                window.location.reload();
            });
    }

    const verificar = (e) => {
        e.preventDefault();
        setLoading(true);
        confirmationResult.confirm(code).then((result) => {
            if (result) {
                setLoading(false);
                router.push("/dashboard")
            }
        }).catch((error) => {
            setLoading(false);
            setErro(error.message);
        });
    }

    return (
        <main className='flex flex-wrap justify-center items-center min-h-80'>
            <div className='max-w-60'>
                {!isVisivel ?
                    <div className="space-y-6">
                        <div className="text-xl font-bold text-gray-900">
                            Informe seu telefone
                        </div>
                        <PatternFormat
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            format="+55 ## ##### ####"
                            className="bg-gray-50 border border-gray-300 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="phone number"
                            type="tel"
                        />
                        <button
                            onClick={requestOTP}
                            type="button"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 w-full me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {loading ? <p>Aguarde...</p> : "Confirmar"}
                        </button>
                        {erro && <p>{erro}</p>}
                    </div>
                    :
                    <div className="space-y-6">
                        <div className="text-xl font-bold text-gray-900">
                            Você recebeu um código!
                        </div>
                        <input
                            onChange={(e) => setCode(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="código"
                            type="tel"
                        />
                        <button
                            onClick={verificar}
                            type="button"
                            className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {loading ? <p>Aguarde...</p> : "Confirmar"}
                        </button>
                        {erro && <p>{erro}</p>}
                    </div>
                }
            </div>
            <div id="recaptcha-container"></div>
        </main>

    )
}

export default withAuth(Signin);