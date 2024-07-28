/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import {
  createThirdwebClient,
  getContract,
  // prepareContractCall,
  readContract,
} from "thirdweb";
// We need this for our RPC. We have to tell our ThirdWeb SDK
// that our smart contracts are deployed to Hardhat testnet for our transactions
import { hardhat, sepolia } from "thirdweb/chains";
// This is needed, the ConnectEmbed has an embeeded Wallet Modal
import {
  ConnectEmbed,
  ThirdwebProvider,
} from "thirdweb/react";
import AppBase from "./components/AppBase.jsx"; // Corrected import statement
import PublishBook from "./components/PublishBook"
// Used to define our wallets. Feel free to experiment after
// this
import { createWallet } from "thirdweb/wallets";
// We need this for our ABI so that it can be used
// for our getContract function to export our smart contracts
// to our JS code
import contractData from "./contracts/BookShelf.json";
// This is needed to use ThirdWeb SDK
const client = createThirdwebClient({
  // We will use the value from our `.env.local`
  clientId: import.meta.env.VITE_REACT_APP_CLIENT_ID,
});
console.log("Client", client);
// Install this wallets later for experimental purposes
// We will be using Metamask for the most part
const wallets = [
  createWallet("io.metamask"),
  createWallet("app.phantom"),
  createWallet("me.rainbow"),
];
// Our first smart contract on the network
export const contract1 = getContract({
  client,
  chain: hardhat,// sepolia,
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",// "0xc116C79dfcd0E7a01e43665F2FA9aFad5F6b2cfD", // if it's hardhat then local dev mode
  abi: contractData.abi,
});
// Our second smart contract on the network
export const contract2 = getContract({
  client,
  chain: hardhat, // sepolia,
  address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", 
  abi: contractData.abi,
});


const App = () => {
  // We also want to know who the author
  // of the contracts are
  const [author, setAuthor] = useState(undefined);
  
  useEffect(() => {
    const handleAuthor = async () => {
      const author = await readContract({
        contract: contract1,
        method: "author",
      });
      setAuthor(author);
    };
    handleAuthor();
  });
  // We need to pass the variables here for ConnectEmbed, otherwise, this will error.
  return (
    <div className="container">
      <ThirdwebProvider>
        <AppBase author={author} />
        <ConnectEmbed
          chain={sepolia}
          modalSize={"wide"}
          client={client}
          wallets={wallets}
        />
        <PublishBook author={author} />
      </ThirdwebProvider>
    </div>
  );
};
export default App;