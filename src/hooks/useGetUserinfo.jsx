import React from 'react';

const useGetUserinfo = () => {
    const {name, profilePhoto, userID, isAuth} = JSON.parse(localStorage.getItem('auth')) || {};
    return {name, profilePhoto, userID, isAuth};

}


export default useGetUserinfo;