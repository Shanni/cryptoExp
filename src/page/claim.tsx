import React, { useState } from "react";
import "./claim.css"; // Import the ClaimPage CSS

const ClaimPage = () => {
  const [claimAmount, setClaimAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleClaim = () => {
    // Handle claim submission here
    console.log("Claim amount:", claimAmount);
    console.log("Transaction ID:", transactionId);
  };

  return (
    <div className="claim-container">
      <h1 className="claim-title">File a Claim</h1>
      <p className="claim-description">
        File a claim for your insurance policy. Our team will review your claim
        and process it accordingly.
      </p>
      <div>
        <input
          className="claim-input"
          type="text"
          placeholder="Claim Amount"
          value={claimAmount}
          onChange={(e) => setClaimAmount(e.target.value)}
        />
      </div>
      <div>
        <input
          className="claim-input"
          type="text"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
      </div>
      <button className="claim-button" onClick={handleClaim}>
        Submit Claim
      </button>
    </div>
  );
};

export default ClaimPage;
