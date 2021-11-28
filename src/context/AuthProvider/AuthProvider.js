import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const allItems = useFirebase();
    return (
        <AuthContext.Provider value={allItems}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;