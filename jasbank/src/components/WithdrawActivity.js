// src/components/WithdrawActivity.js
import React, { useState } from 'react';

function WithdrawActivity({ onWithdraw, onCancel }) {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('1234567'); // Default to Saving Account

  const handleWithdraw = () => {
    if (amount && Number(amount) > 0) {
      onWithdraw({ accountNumber: account, amount: Number(amount) });
      setAmount('');
    } else {
      alert('Please fill in all fields with valid values');
    }
  };

  return (
    <div>
      <h2>Withdraw</h2>
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
        <button type="button" onClick={handleWithdraw}>Withdraw</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default WithdrawActivity;
