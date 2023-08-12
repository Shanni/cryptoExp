import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import InsurancePolicyABI from "../contracts/InsurancePolicy.json"; // Make sure to include the ABI for InsurancePolicy contract

const InsurancePolicyInteraction = () => {
  const [policyHolder, setPolicyHolder] = useState(null);
  const [insuredAmount, setInsuredAmount] = useState(null);
  const [premiumAmount, setPremiumAmount] = useState(null);
  const [coveragePeriod, setCoveragePeriod] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);
  const [policyAddress] = useState("YOUR_INSURANCE_POLICY_ADDRESS"); // Replace with your contract address
  const [signer] = useState(
    new ethers.providers.JsonRpcProvider("YOUR_ETHEREUM_RPC_URL").getSigner(),
  ); // Replace with your RPC URL
  const [policyContract] = useState(
    new ethers.Contract(policyAddress, InsurancePolicyABI.abi, signer),
  );

  useEffect(() => {
    fetchPolicyDetails();
    checkClaimStatus();
  }, []);

  const fetchPolicyDetails = async () => {
    const policyHolder = await policyContract.holder();
    const insuredAmount = await policyContract.insuredAmount();
    const premiumAmount = await policyContract.premiumAmount();
    const coveragePeriod = await policyContract.coveragePeriod();

    setPolicyHolder(policyHolder);
    setInsuredAmount(insuredAmount);
    setPremiumAmount(premiumAmount);
    setCoveragePeriod(coveragePeriod);
  };

  const checkClaimStatus = async () => {
    const claimStatus = await policyContract.hasClaim();
    setClaimStatus(claimStatus);
  };

  const fileClaim = async () => {
    try {
      await policyContract.fileClaim();
      await checkClaimStatus();
    } catch (error) {
      console.error("Error filing claim:", error);
    }
  };

  return (
    <div>
      <h2>Insurance Policy Interaction</h2>
      <p>Policy Holder: {policyHolder}</p>
      <p>Insured Amount: {insuredAmount} ETH</p>
      <p>Premium Amount: {premiumAmount} ETH</p>
      <p>Coverage Period: {coveragePeriod} seconds</p>
      <p>Claim Status: {claimStatus ? "Claim Filed" : "No Claim"}</p>
      <button onClick={checkClaimStatus}>Check Claim Status</button>
      <button onClick={fileClaim} disabled={claimStatus}>
        File Claim
      </button>
    </div>
  );
};

export default InsurancePolicyInteraction;
