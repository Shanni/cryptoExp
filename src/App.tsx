import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Attestooooooor } from "./components";
import InsurancePool from "./components/InsurancePool";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();

  return (
    <>
      <h1>2AM Insurance</h1>

      {/** @see https://www.rainbowkit.com/docs/connect-button */}
      <ConnectButton />

      {isConnected && (
        <>
          <div>
            <h1>Insurance Protocol Frontend</h1>
            <InsurancePool />
          </div>
          <hr />
          <Attestooooooor />
          <hr />
        </>
      )}
    </>
  );
}
