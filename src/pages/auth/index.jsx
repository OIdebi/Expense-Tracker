import React from 'react';
import { signInWithPopup } from 'firebase/auth'
import { auth, provider} from "../../config/firebase-config.js";
import { useNavigate, Navigate } from 'react-router-dom'
import useGetUserinfo from '../../hooks/useGetUserinfo';
import './styles.css'

const Auth = () =>  {

    const navigate = useNavigate();
    const {isAuth} = useGetUserinfo();

    const signInWithGoogle = async () => {
        const results =  await signInWithPopup(auth, provider);
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto: results.user.photoURL,
            isAuth: true,
        }
        localStorage.setItem('auth', JSON.stringify(authInfo));
        navigate('/expense-tracker');
    }

    if (isAuth) {
        return <Navigate to='/expense-tracker' />
    }



    return (
        <div className='login-page'>
            <p>Sign In with Google to Continue</p>
            <button className='login-with-google-btn' onClick={signInWithGoogle}><img className='login-btn-img' src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw" alt=""/> Sign In With Google </button>
        </div>
    );
}

export default Auth;