// src/App.js
import React, { useState } from 'react';
import DepositActivity from './components/DepositActivity';
import WithdrawActivity from './components/WithdrawActivity';
import TransactionHistory from './components/TransactionHistory';
import Login from './components/Login';
import './App.css';
import { FaDollarSign, FaMoneyBillWave } from 'react-icons/fa';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [savingsBalance, setSavingsBalance] = useState(4500);
  const [chequingBalance, setChequingBalance] = useState(19333);
  const [transactions, setTransactions] = useState([]);

  const handleDeposit = ({ accountNumber, amount }) => {
    if (accountNumber === '1234567') {
      setSavingsBalance(savingsBalance + amount);
    } else {
      setChequingBalance(chequingBalance + amount);
    }
    setTransactions([
      ...transactions,
      { type: 'Deposit', amount: `+${amount}`, date: new Date().toLocaleString(), accountType: accountNumber === '1234567' ? 'Saving Account' : 'Chequing Account' }
    ]);
    setShowDeposit(false);
  };

  const handleWithdraw = ({ accountNumber, amount }) => {
    if (accountNumber === '1234567') {
      if (amount <= savingsBalance) {
        setSavingsBalance(savingsBalance - amount);
        setTransactions([
          ...transactions,
          { type: 'Withdraw', amount: `-${amount}`, date: new Date().toLocaleString(), accountType: 'Saving Account' }
        ]);
      } else {
        alert('Insufficient balance in Savings Account');
      }
    } else {
      if (amount <= chequingBalance) {
        setChequingBalance(chequingBalance - amount);
        setTransactions([
          ...transactions,
          { type: 'Withdraw', amount: `-${amount}`, date: new Date().toLocaleString(), accountType: 'Chequing Account' }
        ]);
      } else {
        alert('Insufficient balance in Chequing Account');
      }
    }
    setShowWithdraw(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="App">
      <nav className="App-nav">
        <img src="/bank-logo.png" className="App-logo" alt="logo" />
        <h1>JASBANK</h1>
      </nav>
      <div className="App-hero">
        <div className="hero-content">
          <h2>Welcome to JASBANK</h2>
          <p>Your trusted partner in financial growth.</p>
          <blockquote>"The future belongs to those who believe in the beauty of their dreams."</blockquote>
        </div>
      </div>
      <div className="App-welcome">
        <h2>Hello! Jasdeep</h2>
      </div>
      <div className="App-content-box">
        <div className="App-content">
          <div className="App-account-info">
            <h3>Saving Account: 1234567</h3>
            <p className="account-balance">Balance: ${savingsBalance}</p>
            <h3>Chequing Account: 0987654</h3>
            <p className="account-balance">Balance: ${chequingBalance}</p>
          </div>
          <div className="App-buttons">
            <button onClick={() => { setShowDeposit(true); setShowWithdraw(false); }}>
              <FaDollarSign /> Deposit
            </button>
            <button onClick={() => { setShowDeposit(false); setShowWithdraw(true); }}>
              <FaMoneyBillWave /> Withdraw
            </button>
          </div>
          {showDeposit && <DepositActivity onDeposit={handleDeposit} onCancel={() => setShowDeposit(false)} />}
          {showWithdraw && <WithdrawActivity onWithdraw={handleWithdraw} onCancel={() => setShowWithdraw(false)} />}
          <TransactionHistory transactions={transactions} />
        </div>
      </div>
      <footer className="App-footer">
        <p>© 2023 JASBANK. All rights reserved.</p>
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#contact">Contact Us</a>
      </footer>
    </div>
  );
}

export default App;
