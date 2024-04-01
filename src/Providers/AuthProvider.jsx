import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);

    // create user function 
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // user sign in function 
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // observe auth state change 
    useEffect(()=> {
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('observing', currentUser)
        });

        return () => {
            unSubscribe();
        }
    }, []);

    // user Sign out function 
    const logOut = () => {
        return signOut(auth);
    }
    const authInfo = { user, createUser, signInUser, logOut };
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node
}
export default AuthProvider;