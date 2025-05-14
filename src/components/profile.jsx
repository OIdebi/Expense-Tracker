import React from "react";
import {deleteUser, signOut} from "firebase/auth";
import {auth} from "../config/firebase-config.js";
import useGetUserinfo from "../hooks/useGetUserinfo.jsx";
import {useNavigate} from "react-router-dom";


const Profile = () => {
    const { name, profilePhoto } = useGetUserinfo();
    const navigate = useNavigate();

    // Get today’s date
    const today = new Date();

    // Extract pieces
    const day   = String(today.getDate()).padStart(2, '0');              // "13"
    const month = today.toLocaleString('default', { month: 'long' });    // "May"
    const weekday = today.toLocaleString('default', { weekday: 'long' });// "Tuesday"

    // Build your formatted string
    const formattedDate = `${day} ${month}, ${weekday}`;
    const timeOfDay = getTimeOfDay();

    function getTimeOfDay() {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return 'Morning';
        } else if (hour >= 12 && hour < 17) {
            return 'Afternoon';
        } else if (hour >= 17 && hour < 21) {
            return 'Evening';
        } else {
            return 'Night';
        }
    }

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear()
            navigate("/")
        } catch (err) {
            console.error(err);
        }
    }

    const deleteAccount = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await deleteUser(user);
                localStorage.clear();
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    {/* Profile section */}
    return (
        <div className='expense-tracker-profile'>
            <div className='profile'>
                <img
                    className='profile-photo'
                    src={profilePhoto || 'images/guest.png'}
                    alt="Profile Photo"
                />

                <div className='profile-info'>
                    <h3>Good {timeOfDay},</h3>
                    <h1>{name}</h1>
                    <p>{formattedDate}</p>

                    <button className='sign-out-button' onClick={signUserOut}>
                        Sign Out
                    </button>
                    <button className='delete-button' onClick={deleteAccount}>
                        DELETE Account
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Profile;