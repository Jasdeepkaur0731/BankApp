// src/components/DepositActivity.js
import React, { useState } from 'react';
import DepositButton from './DepositButton';

function DepositActivity({ onDeposit, onCancel }) {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('1234567'); // Default to Saving Account

  const handleDeposit = () => {
    if (amount && Number(amount) > 0) {
      onDeposit({ accountNumber: account, amount: Number(amount) });
      setAmount('');
    } else {
      alert('Please fill in all fields with valid values');
    }
  };

  return (
    <div>
      <h2>Deposit</h2>
      <form>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Account:</label>
          <select value={account} onChange={(e) => setAccount(e.target.value)}>
            <option value="1234567">Saving Account</option>
            <option value="0987654">Chequing Account</option>
          </select>
        </div>
        <DepositButton onClick={handleDeposit} />
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default DepositActivity;
