import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken } from "firebase/auth";
import initializeFirebase from "../Pages/LoginPage/Login/Firebase/Firebase.init";


initializeFirebase();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [AuthError, setAuthError] = useState();
    const [admin, setAdmin] = useState();
    const [token, setToken] = useState();

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                const newUser = { email, displayName: name };
                setUser(newUser);

                saveUser(email, name, 'post');
                // send name to firebase after creation 
                updateProfile(auth.currentUser, {
                    displayName: name,
                })
                    .then(() => {

                    })
                    .catch((error) => {
                        setAuthError(error.message)
                    });

                history.replace('/');
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false));
    };

    const signInUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {

                const destination = location?.state?.from || '/';
                history.replace(destination)
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false))
    };

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, 'put');
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => {

            })
            .finally(() => setIsLoading(false))
    };

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:7000/userInfo', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken)
                    })
            } else {
                setUser({})
            }
            setIsLoading(false);
        })
        return () => unSubscribe;
    }, [auth]);

    useEffect(() => {
        fetch(`http://localhost:7000/userInfo/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            })
    }, [user?.email])

    return {
        user,
        admin,
        token,
        AuthError,
        isLoading,
        registerUser,
        signInUser,
        signInWithGoogle,
        logOut
    }
};

export default useFirebase;