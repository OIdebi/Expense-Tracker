import React from 'react';
import useGetTransactions from "../hooks/useGetTransactions.jsx";

const BalanceReport = () => {
    const { transactionTotal} = useGetTransactions();
    const {balance, income, expense} = transactionTotal;

    {/* Report section */}
    return (

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
    );
}

export default BalanceReport;