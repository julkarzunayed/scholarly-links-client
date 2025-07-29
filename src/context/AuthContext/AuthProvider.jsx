

import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';

import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../../firebas/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    };

    const signinWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Optional: refresh the token
                const token = await currentUser.getIdToken(true);
                console.log("Token:", token);
            }
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const userLogout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signinWithGoogle,
        userLogout,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;








// import {
//     createUserWithEmailAndPassword,
//     GoogleAuthProvider,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     signOut,
//     updateProfile
// } from 'firebase/auth';

// import React, { Children, useEffect, useState } from 'react';
// import { AuthContext } from './AuthContext';
// import { auth } from '../../firebas/firebase.init';

// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const createUser = (email, password) => {
//         setLoading(true);
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     const signInUser = (email, password) => {
//         setLoading(true);
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     const updateUserProfile = (updateData) => {
//         return updateProfile(auth.currentUser, updateData)
//     };

//     const signinWithGoogle = () => {
//         return signInWithPopup(auth, googleProvider);
//     }

//     useEffect(() => {
//         const unSubscribe = () => onAuthStateChanged(auth, (currentUser) => {
//             setUser(currentUser)
//             setLoading(false);
//             console.log(currentUser)
//         });

//         return () => {
//             unSubscribe();
//         }
//     }, []);

//     const userLogout = () => {
//         setLoading(true);
//         return signOut(auth);
//     }

//     const authInfo = {
//         user,
//         loading,
//         createUser,
//         signInUser,
//         signinWithGoogle,
//         userLogout,
//         updateUserProfile,
//     }

//     return (
//         <AuthContext value={authInfo}>
//             {children}
//         </AuthContext>
//     );
// };

// export default AuthProvider;