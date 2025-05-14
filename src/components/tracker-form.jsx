import React, {useState} from 'react';
import useAddTransactions from "../hooks/useAddTransactions.jsx";

const TrackerForm = () => {
    const { addTransactions } = useAddTransactions();
    const [description, setDescription] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionType, setTransactionType] = useState('expense');

    const onSubmit = async (e) => {
        e.preventDefault();

        const amount = parseFloat(transactionAmount || 0)

        await addTransactions(
            {
                description,
                transactionAmount: amount,
                transactionType,
            });
        setDescription('');
        setTransactionAmount('');
    };

    return (
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
                            onKeyDown={e => {
                                if (['e','E','+','-'].includes(e.key)) {
                                    e.preventDefault();
                                }}}
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
    );
}

export default TrackerForm;