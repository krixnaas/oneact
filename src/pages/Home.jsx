import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Web3 from "web3";
import AppContext from "../appContext";
import Card from "../components/Card";

const Home = () => {
  const [cause, setCause] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dependencies } = useContext(AppContext);
  const { data, account } = dependencies;

  const getData = async () => {
    const homeData = await data.methods.getHomeData().call();
    console.log(homeData);
    return homeData;
    //return constructcauseArray(homeData);
  };
  useEffect(() => {
    (async function () {
      // setupCreatePostListener();
      setCause(await getData());
      setLoading(true);
    })();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 container">
        <div className="flex justify-end">
          <Link
            to="new"
            className="py-2 px-2 font-medium text-white bg-green-500 rounded
						 hover:bg-green-400 transition duration-300"
          >
            Dashboard
          </Link>
        </div>
        <div class="grid md:grid-cols-3 gap-4 ">
          {cause.map((item) => {
            if (item.status == true) {
              return (
                <Card
                  title={item.title}
                  description={item.des}
                  goal={item.goal}
                  balance={item.current}
                  causeId={item.id}
                  status={item.status}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export default Home;
