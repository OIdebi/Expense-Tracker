// import React from 'react';
import React from "react";
import '../../styles/expense-styles.css'
import TransactionList from "../../components/Transaction-list.jsx";
import Profile from "../../components/profile.jsx";
import BalanceReport from "../../components/balance-report.jsx";
import TrackerForm from "../../components/tracker-form.jsx";

const ExpenseTracker = () =>  {
    return (
            <div className='expense-tracker-page'>
                {/* Profile Section */}
                <Profile />
                {/* Report Section */}
                <BalanceReport/>
                {/* Form Section */}
                <TrackerForm/>
                {/* Transition Record */}
                <TransactionList/>
            </div>
    );
}

export default ExpenseTracker;