import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Link } from "react-router-dom";
import { Attestooooooor } from "../components";
import "../style/App.css"; // Create an App.css file for styling

const ReportPage = () => {

  return (
    <div>
      <hr />
      <Attestooooooor />
      <hr />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default ReportPage;
