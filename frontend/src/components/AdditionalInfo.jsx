/* eslint-disable react/prop-types */
import { useActiveWalletConnectionStatus} from "thirdweb/react";
import { contract1 } from "../App.jsx";

const AdditionalInfo = ({ author }) => {
  const account = useActiveWalletConnectionStatus();
  return (
    <>
      {account ? (
        <>
        <h2>Currently Connected Wallet Address: {account} </h2>

      </>

      ) : (
        <h2>Your wallet is not connected. Please connect.</h2>
      )}
      {author ? <h2>Author&rsquo;s address: {author}</h2> : ""}
      <h2>Smart Contract Address: {contract1.address}</h2>
    </>
  );
};

export default AdditionalInfo;