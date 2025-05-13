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

    // Get today’s date
    const today = new Date();

    // Extract pieces
    const day   = String(today.getDate()).padStart(2, '0');              // "13"
    const month = today.toLocaleString('default', { month: 'long' });    // "May"
    const weekday = today.toLocaleString('default', { weekday: 'long' });// "Tuesday"

    // Build your formatted string
    const formattedDate = `${day} ${month}, ${weekday}`;
    const timeOfDay = getTimeOfDay();

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


    return (
        <>
            <div className='expense-tracker-page'>

                {/* Profile section */}
                <div className='expense-tracker-profile'>
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

                {/* Report section */}
                <div className='expense-tracker-report'>

                            <div className='balance summary-info'>
                                <img src="" alt=""/>
                                <h3> Balance Difference: </h3>
                                {balance >= 0 ? <h2> ${balance} </h2> : <h2> -${Math.abs(balance)} </h2>}
                            </div>

                            <div className='income summary-info'>
                                <img src="" alt=""/>
                                <h4> Total Income: </h4>
                                <p> ${income} </p>
                            </div>

                            <div className='expenses summary-info'>
                                <img src="" alt=""/>
                                <h4> Total Expenses: </h4>
                                <p> ${expense} </p>
                            </div>
                </div>

                <div className="expense-tracker-input">
                    <h2>Add a Transaction</h2>
                    <form className="add-transaction" onSubmit={onSubmit} noValidate>
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    type="text"
                                    placeholder="E.g. Coffee, Groceries…"
                                    value={description}
                                    required
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    id="amount"
                                    type="number"
                                    placeholder="0.00"
                                    value={transactionAmount}
                                    required
                                    onChange={e => setTransactionAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <fieldset className="form-group radio-group">
                                <legend>Type</legend>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="expense"
                                        checked={transactionType === 'expense'}
                                        onChange={e => setTransactionType(e.target.value)}
                                    />
                                    Expense
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="income"
                                        checked={transactionType === 'income'}
                                        onChange={e => setTransactionType(e.target.value)}
                                    />
                                    Income
                                </label>
                            </fieldset>
                            <button type="submit" className="submit-btn">Add Transaction</button>

                        </div>

                    </form>
                </div>

                <div className='expense-tracker-records'>
                    <div className='transactions'>
                        <h3>Transactions</h3>
                        <ul>
                            {transactions.map(({ id, description, transactionAmount, transactionType }) => (
                                <li key={id}>
                                    <h4>{description}</h4>
                                    <p>
                                        ${transactionAmount.toFixed(2)}
                                        <label className={transactionType}>
                                            {transactionType}
                                        </label>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>


        </>
    );
}

export default ExpenseTracker;