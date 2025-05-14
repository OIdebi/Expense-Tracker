import { useEffect, useState, useCallback } from 'react';
import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-config.js';
import useGetUserinfo from './useGetUserinfo';

const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotal, setTransactionTotal] = useState({
        balance: 0.0,
        income: 0.0,
        expense: 0.0,
    })
    
    const transactionCollectionRef = collection(db, 'transactions');
    const { userID } = useGetUserinfo();

    useEffect(() => {
        const queryTransactions = query(
            transactionCollectionRef,
            where('userID', '==', userID),
            orderBy('createdAt'),
        );

        const unsubscribe = onSnapshot(queryTransactions, snapshot => {
            let totalIncome = 0, totalExpense = 0;
            const docs = snapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                if (data.transactionType === 'income') totalIncome += Number(data.transactionAmount);
                else totalExpense += Number(data.transactionAmount);
                return { id: docSnap.id, ...data};
            });
            setTransactions(docs);
            setTransactionTotal({
                balance: totalIncome - totalExpense,
                income: totalIncome,
                expense: totalExpense,
            });
        });
        return () => unsubscribe();
    }, [userID]);

    // Delete a transaction
    const deleteTransaction = useCallback(async (id) => {
        await deleteDoc(doc(db, 'transactions', id)); // Firebase deleteDoc()
        setTransactions(prev => prev.filter(tx => tx.id !== id));  // update state
    }, []);

    return { transactions, transactionTotal, deleteTransaction };
};

export default useGetTransactions;


