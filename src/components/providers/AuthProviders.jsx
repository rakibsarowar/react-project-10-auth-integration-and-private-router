import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';

// Step 01  create UserContext & Export it-------------
export const AuthContext = createContext(null)

// Step 03 ---------------firebase----------------
const auth = getAuth(app)

//step 08 - google sign in --------------------------------------------------------------------------
const googleAuthProvider = new GoogleAuthProvider();


const AuthProviders = ({children}) => {
    
    //  Step 05 -Integration ---------------------------------------------------------------------------
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // step 8.1 --------------------------------------------------------------------------------------
    const signInWithGoogle = () =>{
        return signInWithPopup(auth, googleAuthProvider)
    }

    // step 07 making signOut---------------------------------------------------------------------------
    const logOut =() => {
        return signOut(auth)
    }
    
    // Step 04 - share data in state --------------------
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    
    // step 06 observe auth state change------------------------------------------------------------------------
    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(auth, currentUser=>{
            console.log('auth state change', currentUser);
            setUser(currentUser);
            setLoading(false)
        });
        return()=>{
            unsubscribe();
        }
    },[])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut
    }
    

    // Step 02: create a user & return authContext Provider with value-----------------------------------
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;