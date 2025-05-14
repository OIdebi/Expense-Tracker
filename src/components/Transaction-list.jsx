import React from 'react';
import useGetTransactions from '../hooks/useGetTransactions';

const TransactionList = () => {
    const {transactions, deleteTransaction} = useGetTransactions();

    return (
        <div className='expense-tracker-records'>
            <div className='transactions'>
                <h3>Transactions</h3>
                <ul>
                    {transactions.map(({ id, description, transactionAmount, transactionType }) => (
                        <li key={id} className='transaction-item'>
                            <p>
                                <h4>{description}</h4>

                                ${transactionAmount.toFixed(2)}
                            </p>

                            <div>
                                <label className={transactionType}>
                                    {transactionType}
                                </label>
                                <button
                                    className='delete-btn btn'
                                    onClick={() => deleteTransaction(id)}
                                    aria-label='Delete {description}'
                                >
                                    X
                                </button>
                            </div>


                        </li>


                    ))}

                </ul>
            </div>
        </div>
    );
}

export default TransactionList;