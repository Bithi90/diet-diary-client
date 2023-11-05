/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
export const AuthContext = createContext(null);
import { app } from "../Firebase/Firebase.config";
const auth = getAuth(app);


const Authprovider = ({children}) => {

     const [user, setUser]  = useState(null);
    const [loading , setLoading] = useState(true);   
    const googleProvider = new GoogleAuthProvider();         


    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth , email, password); 
    }

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth);  
    }

    const updateUserProfile = (name , photo) =>{
        return updateProfile(auth.currentUser, {
            displayName:name, photoURL: photo
          });  
    }

    const googleSignIn = () =>{
        setLoading();
        return signInWithPopup(auth, googleProvider);
    }
   

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{ 
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        
        });
        return () => {
            return unsubscribe();
        }
    }, [])


    const authInfo  = {
        user,
        loading,
        createUser,
        googleSignIn,
        signIn,
        logOut,
        updateUserProfile
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;