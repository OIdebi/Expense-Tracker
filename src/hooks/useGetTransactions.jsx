import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
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

    const getTransactions = async () => {
        let unsubscribe;
        try {
            const queryTransactions = query(
                transactionCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt", )
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalIncome = 0;
                let totalExpense = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({...data, id });


                    if (data.transactionType === "expense") {
                        totalExpense += Number(data.transactionAmount);
                    } else if (data.transactionType === "income") {
                        totalIncome += Number(data.transactionAmount);
                    }
                    console.log(data.transactionType)
                });
                setTransactions(docs);

                let balance = totalIncome - totalExpense;
                setTransactionTotal({
                    balance,
                    income: totalIncome,
                    expense: totalExpense,
                })

            });
        } catch (err) {
            console.error(err);
        }

        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return { transactions, transactionTotal };
};

export default useGetTransactions;


