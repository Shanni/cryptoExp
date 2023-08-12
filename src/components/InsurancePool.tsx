import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import InsurancePoolABI from './contracts/InsurancePool.json'; // Make sure to include the ABI for InsurancePool contract

const InsurancePool = () => {
  const [poolBalance, setPoolBalance] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [poolContract, setPoolContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    connectWallet();
    updatePoolBalance();
  }, []);

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider("YOUR_ETHEREUM_RPC_URL"); // Replace with your RPC URL
      setSigner(provider.getSigner());
      setPoolContract(new ethers.Contract("YOUR_INSURANCE_POOL_ADDRESS", InsurancePoolABI.abi, signer)); // Replace with your contract address
      await updatePoolBalance();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const updatePoolBalance = async () => {
    try {
      const balance = await poolContract!.contractBalance();
      setPoolBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error fetching pool balance:', error);
    }
  };

  const depositFunds = async () => {
    if (!depositAmount || Number(depositAmount) <= 0) {
      return;
    }

    try {
      const transaction = await poolContract!.deposit({ value: ethers.utils.parseEther(depositAmount) });
      await transaction.wait();
      await updatePoolBalance();
      setDepositAmount('');
    } catch (error) {
      console.error('Error depositing funds:', error);
    }
  };

  return (
    <div>
      <h2>Insurance Pool</h2>
      <p>Pool Balance: {poolBalance} ETH</p>
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>
        <input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="Enter amount" />
        <button onClick={depositFunds}>Deposit Funds</button>
      </div>
    </div>
  );
};

export default InsurancePool;
