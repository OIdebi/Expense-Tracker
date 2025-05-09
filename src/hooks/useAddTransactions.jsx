import React from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import {db} from "../config/firebase-config.js";
import useGetUserinfo from "./useGetUserinfo.jsx"

const useAddTransactions = () => {
    const transactionCollectionRef = collection(db, "transactions");
    const {userID} = useGetUserinfo();

    const addTransaction = async ({description, transactionAmount, transactionType}) => {
        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        })
    }
    return {addTransactions: addTransaction}
}

export default useAddTransactions;