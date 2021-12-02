import React, { useState, useEffect, Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Image from "./assets/img/register_bg_2.png";

import Home from "./pages/Home";
import New from "./pages/New";
import Web3 from "web3";
import AppContext from "./appContext";
import OneAct from "./abis/OneAct.json";
import Navbar from "./components/CustomNavbar";

function App() {
  const [dependencies, setDependencies] = useState({
    web3: null,
    account: null,
    data: null,
    loaded: false,
  });

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  useEffect(() => {
    loadWeb3();
    (async function () {
      const web3 = window.web3;
      const networkId = await web3.eth.net.getId();
      const networkData = OneAct.networks[networkId];

      //console.log(networkData);
      const data = new web3.eth.Contract(OneAct.abi, networkData.address);
      console.log(data);

      const [account] = await web3.eth.getAccounts();

      setDependencies((previousState) => ({
        ...previousState,
        web3,
        account,
        data,
        loaded: true,
      }));
    })();
  }, []);

  /**
   * @description Abstraction for connecting user to application;
   * this is shown to the user if they are not initially connected
   * on load
   */
  const connect = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const { web3 } = dependencies;
    const [account] = await web3.eth.getAccounts();
    setDependencies((previousState) => ({ ...previousState, account }));
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ dependencies }}>
        {dependencies.loaded ? (
          dependencies.account ? (
            <>
              <Navbar account={dependencies.account} />
              <Routes>
                <Route exact path="/oneact" element={<Home />} />
                <Route exact path="/oneact/new" element={<New />} />
              </Routes>
            </>
          ) : (
            <>
              <main>
                <section className="absolute w-full h-full">
                  <div
                    className="absolute top-0 w-full h-full bg-gray-900"
                    style={{
                      backgroundImage: `url(${Image})`,

                      backgroundSize: "100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                          <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-1">
                              <h6 className="text-gray-600 text-sm font-bold">
                                Sign in with Your Wallet
                              </h6>
                            </div>

                            <hr className="mt-6 border-b-1 border-gray-400" />
                          </div>
                          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <form>
                              <div className="text-center mt-2">
                                <button
                                  onClick={connect}
                                  className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                  type="button"
                                  style={{ transition: "all .15s ease" }}
                                >
                                  Connect
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="flex flex-wrap mt-6">
                          <div className="w-1/2">
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              className="text-gray-300"
                            >
                              <small>Forgot password?</small>
                            </a>
                          </div>
                          <div className="w-1/2 text-right">
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                              className="text-gray-300"
                            >
                              <small>Create new account</small>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </>
          )
        ) : (
          <div>loading....</div>
        )}
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
