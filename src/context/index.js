import { createContext, useState} from 'react';

export const AppContext = createContext();

export function AppWrapper({children}) {
    let [user, setUser] = useState('Francisco');

    return(
        <AppContext.Provider value={{
            user
        }}>
            {children}
        </AppContext.Provider>
    )
}
