import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase/firebase.config';

// Step 01  create UserContext & Export it-------------
export const AuthContext = createContext(null)

// Step 03 ---------------firebase----------------
const auth = getAuth(app)


const AuthProviders = ({children}) => {
    
    //  Step 05 -Integration ---------------------------------------------------------------------------
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    // Step 04 - share data in state --------------------
    const [user, setUser] = useState(null);
    
    // step 06 observe auth state change------------------------------------------------------------------------
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, currentUser=>{
            console.log('auth state change', currentUser);
            setUser(currentUser)
        });
        return()=>{
            unsubscribe();
        }
    },[])


    const authInfo = {
        user,
        createUser,
        signIn,
    }
    

    // Step 02: create a user & return authContext Provider with value-----------------------------------
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;