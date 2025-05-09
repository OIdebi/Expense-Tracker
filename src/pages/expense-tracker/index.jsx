// import React from 'react';
import useAddTransactions from '../../hooks/useAddTransactions';
import useGetTransactions from '../../hooks/useGetTransactions';
import useGetUserinfo from '../../hooks/useGetUserinfo';
import React,{useState} from "react";
import {signOut, deleteUser} from 'firebase/auth'
import {auth} from '../../config/firebase-config.js'
import {useNavigate} from "react-router-dom";
import './styles.css'


const ExpenseTracker = () =>  {
    const { addTransactions } = useAddTransactions();
    const { transactions, transactionTotal } = useGetTransactions();
    const { name, profilePhoto } = useGetUserinfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState('expense');

    const {balance, income, expense} = transactionTotal;

    const onSubmit = async (e) => {
        e.preventDefault();
        await addTransactions(
            {
                description,
                transactionAmount: Number(transactionAmount),
                transactionType,
            });
        setDescription('');
        setTransactionAmount(0);
    };

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
            const user = auth.currentUser();
            if (user) {
                await deleteUser(user);
                localStorage.clear();
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            <div className='expense-tracker'>
                <div className='container'>
                    <h1>{name}'s Expense Tracker</h1>
                    <div className='balance'>
                        <h3> Your Balance </h3>
                        {balance >= 0 ? <h2> ${balance} </h2> : <h2> -${Math.abs(balance)} </h2>}

                    </div>
                    <div className='summary'>
                        <div className='income'>
                            <h4> Income </h4>
                            <p> ${income} </p>
                        </div>
                        <div className='expenses'>
                            <h4> Expenses </h4>
                            <p> ${expense} </p>
                        </div>
                    </div>
                    <form action="" className='add-transaction' onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder='Description'
                            value={description}
                            required={true}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder='Amount'
                            value={transactionAmount}
                            required={true}
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />

                        <input
                            type="radio"
                            id='expense'
                            value="expense"
                            checked={transactionType === 'expense'}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense"> Expense </label>

                        <input
                            type="radio"
                            id='income'
                            value="income"
                            checked={transactionType === 'income'}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income"> Income </label>

                        <button type='submit' className='submit'> Add Transaction </button>
                    </form>
                </div>

                <div className='profile'>
                    {profilePhoto ? (
                        <img className='profile-photo' src={profilePhoto} alt="Profile Photo" />
                    ) : (
                        <img
                            className='profile-photo'
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="Default Profile"
                        />
                    )}
                    <button className='sign-out-button' onClick={signUserOut}>
                        Sign Out
                    </button>
                    <button className='delete-button' onClick={deleteAccount}>
                        DELETE Account
                    </button>
                </div>
            </div>

            <div className='transactions'>
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <h4>{transaction.description}</h4>
                            <p>${transaction.transactionAmount} •
                                <label style={{color: transaction.transactionType === "expense" ? "red" : "green"}}>
                                    {transaction.transactionType}
                                </label>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default ExpenseTracker;