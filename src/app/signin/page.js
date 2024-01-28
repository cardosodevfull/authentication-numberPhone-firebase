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
        window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
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
        <main>
            <div className="app-container container">
                {!isVisivel ?
                    <div className="row">
                        <div className="app-title mb-3">
                            Entrar com telefone
                        </div>
                        <PatternFormat
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            format="+55 ## ##### ####"
                            className="form-control"
                            placeholder="Informe seu telefone"
                            type="tel"
                        />
                        <button
                            onClick={requestOTP}
                            type="button"
                            className="btn btn-dark w-100  mt-3 btn-block">
                            {loading ? <p>Aguarde...</p> : "Entrar"}
                        </button>
                        {erro && <p className='text-danger mt-2'>{erro}</p>}
                    </div>
                    :
                    <div className="row">
                        <div className="app-title mb-3">
                            Você recebeu um código!
                        </div>
                        <input
                            onChange={(e) => setCode(e.target.value)}
                            className="form-control"
                            placeholder="Informe o código"
                            type="tel"
                        />
                        <button
                            onClick={verificar}
                            type="button"
                            className="btn btn-dark w-100  mt-3 btn-block">
                            {loading ? <p>Aguarde...</p> : "Confirme"}
                        </button>
                        {erro && <p className='text-danger mt-2'>{erro}</p>}
                    </div>
                }
            </div>
            <div id="recaptcha-container"></div>
        </main>
    )
}

export default withAuth(Signin);