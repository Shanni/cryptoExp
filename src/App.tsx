import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { Attestooooooor } from "./components";
import InsurancePool from "./components/InsurancePool";
import "./style/App.css"; // Create an App.css file for styling
import ReportPage from "./page/reportScam";
import ClaimPage from "./page/claim";

const Home = () => {
  return (
    <div className="connected-content">
      <hr />
      <h2 className="modern-title">Welcome to Your Insurance Dashboard</h2>
      <p className="modern-description">
        Explore your policy details and manage your insurance effortlessly.
      </p>
      <hr />
      <Link to="/report">Go to Report Page</Link>
    </div>
  );
};

const DashboardPanel = () => {
  return (
    <div className="dashboard-panel">
      <Link className="dashboard-button" to="/make-claim">
        Make a Claim
      </Link>
      <Link className="dashboard-button" to="/insurance-pool">
        View Insurance Pool
      </Link>
      <Link className="dashboard-button" to="/wallet-score">
        My Wallet Score
      </Link>
    </div>
  );
};

export function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <Link className="app-title-link" to="/">
            <h1 className="app-title">2AM Insurance</h1>
          </Link>
          <div className="connect-button-container">
            <nav>
              <button className="dropdown-button" onClick={toggleDropdown}>
                Navigation
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/claim">Make a Claim</Link>
                  </li>
                  <li>
                    <Link to="/insurance-pool">View Insurance Pool</Link>
                  </li>
                  <li>
                    <Link to="/wallet-score">My Wallet Score</Link>
                  </li>
                </ul>
              )}
            </nav>

            <ConnectButton />
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/claim" element={<ClaimPage />} />
          {/* <Route path="/insurance-pool" element={<InsurancePool />} /> */}
          {/* <Route path="/wallet-score" element={<WalletScore />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

// export function App() {
//   const { isConnected } = useAccount();

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1 className="app-title">2AM Insurance</h1>
//         <div className="connect-button-container">
//           <ConnectButton />
//         </div>
//       </header>

//       {isConnected && (
//         <div className="connected-content">
//           <hr />
//           <h2 className="modern-title">Welcome to Your Insurance Dashboard</h2>
//           <p className="modern-description">
//             Explore your policy details and manage your insurance effortlessly.
//           </p>
//           <hr />
//           <Attestooooooor />
//           <hr />
//         </div>
//       )}
//     </div>
//   );
// }

// export function App() {
//   /**
//    * Wagmi hook for getting account information
//    * @see https://wagmi.sh/docs/hooks/useAccount
//    */
//   const { isConnected } = useAccount();

//   return (
//     <div className="app-container">
//       <h1 className="app-title">2AM Insurance</h1>

//       {/** @see https://www.rainbowkit.com/docs/connect-button */}
//       <ConnectButton />

//       {isConnected && (
//         <div className="connected-content">
//         {/* <div>
//             <h1>Insurance Protocol Frontend</h1>
//             <InsurancePool />
//           </div> */}
//           <hr />
//           <Attestooooooor />
//           <hr />
//         </div>
//       )}
//     </div>
//   );
// }
