import React from 'react';
import { signInWithPopup } from 'firebase/auth'
import { auth, provider} from "../../config/firebase-config.js";
import { useNavigate, Navigate } from 'react-router-dom'
import useGetUserinfo from '../../hooks/useGetUserinfo';
import '../../styles/auth-styles.css'

const Auth = () =>  {

    const navigate = useNavigate();
    const {isAuth} = useGetUserinfo();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Build and save your authInfo
            const authInfo = {
                userID: user.uid,
                name: user.displayName,
                profilePhoto: user.photoURL,
                isAuth: true,
            };
            localStorage.setItem('auth', JSON.stringify(authInfo));

            // Navigate immediately after popup resolves
            navigate('/expense-tracker');
        } catch (error) {
            console.error('Popup sign-in error:', error);
        }
    };

    const continueAsGuest = () => {
        const guestInfo = {
            userID: 'guest_' + Date.now(),
            name: 'Guest User',
            profilePhoto: 'images/guest.png',
            isAuth: true,
            isGuest: true,
        };
        localStorage.setItem('auth', JSON.stringify(guestInfo));
        navigate('/expense-tracker');
    }

    if (isAuth) {
        return <Navigate to='/expense-tracker' />
    }


    return (
        <div className='login-page'>
            <p className='login-title'>Expense-Calc</p>
            <div className='login-card'>

                <div className='login-card_container'>
                    <h1 id='auth-heading' className='welcome-title'>
                        Welcome back...
                    </h1>
                    <p className='login-subtitle'>
                        Choose How you would like to log in.
                        {/*Check your Income and Expanse Difference*/}
                    </p>
                    <div className='login-card_button_section'>
                        <button
                            className='login-with-google-btn'
                            onClick={signInWithGoogle}
                            aria-label='Sign in with Google'

                        >
                            <img
                                src='/images/google-icon.png'
                                alt='Google'
                            />
                            Sign in with Google
                        </button>
                        <span className='divider'> <hr/> OR <hr/> </span>
                        <button
                            className='login-as-guest-btn'
                            onClick={continueAsGuest}
                            aria-label='Continue as guest'
                        >
                            <p></p>
                            continue as guest
                        </button>
                    </div>
                </div>
            </div>
            
            <div className='login-hero'>
            </div>
        </div>
    );
}

export default Auth;