import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import Rewards from "./utils/FeeCollector.json";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";

const CONTRACT_ADDRESS = "0x7f431453bc14c8d7efa019d68df644c7b8ee0bc3";
function App() {
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  const TransferWeth = () => {
    const { fetch, error, isFetching } = useWeb3Transfer({
      amount: Moralis.Units.Token(20, 18),
      receiver: data.address,
      type: "erc20",
      contractAddress: "0xa240974f973bf9e3640fad9bf69d1ee4c1817c22",
    });

    const btnhandler = () => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
      } else {
        alert("install metamask extension!!");
      }
    };

    const getbalance = (address) => {
      window.ethereum
        .request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })
        .then((balance) => {
          setdata({
            Balance: ethers.utils.formatEther(balance),
          });
        });
    };

    const accountChangeHandler = (account) => {
      setdata({
        address: account,
      });

      getbalance(account);
    };

    return (
      <div className="App">
        <div className="text-center">
          <div>
            <strong>Address: </strong>
            {data.address}
          </div>
          <div>
            <div>
              <strong>Balance: </strong>
              {data.Balance}
            </div>
            <button onClick={btnhandler}>Connect to wallet</button>
          </div>
        </div>
        <div>
          <button onClick={() => fetch()} disabled={isFetching}>
            Transfer
          </button>
        </div>
      </div>
    );
  };
}
export default App;
