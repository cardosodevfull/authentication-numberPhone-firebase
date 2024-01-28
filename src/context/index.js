import { createContext, useState} from 'react';
import { app } from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation';

export const AppContext = createContext();

const auth = getAuth();

export function AppWrapper({children}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(false);
    let [user, setUser] = useState('Francisco');

    const logout = async () => {
        await app.auth().signOut();       
        setUser(null);
        router.push('/')
    }

    return(
        <AppContext.Provider value={{
            user,
            setUser,
            loading, setLoading,
            erro, setErro,
            logout
        }}>
            {children}
        </AppContext.Provider>
    )
}
