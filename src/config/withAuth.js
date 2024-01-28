"use client";
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { app } from './firebaseConfig';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Spinner from '../components/Spinner';
import { AppContext } from '../context/';

const auth = firebase.auth();

const withAuth = Component => props => {
  const { setUser } = useContext(AppContext);
    const [authloading,setAuthloading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        auth.onAuthStateChanged(auth => {
          if (!auth) {
            setAuthloading(false);
            router.push('/signin');
          }
          else{
            setAuthloading(false);
            setUser(auth._delegate.phoneNumber);
          }
        });
      }, []);
    

    return authloading ? <Spinner /> :(
        <div>
          <Component {...props} />
        </div>
      )
}

export default withAuth;