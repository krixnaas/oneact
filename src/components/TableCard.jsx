import React, { useState, useContext } from "react";

import AppContext from "../appContext";

const TableCard = ({
  id,
  title,
  description,
  goal,
  current,
  creator,
  status,
}) => {
  const { dependencies } = useContext(AppContext);
  const { data, account } = dependencies;
  let [checked, setChecked] = useState(status);
  
  const [cause, setCause] = useState([]);
  
  const toggleChecked = async(causeID) => {
    //console.log(causeID);
    await data.methods
      .toggleCause(causeID)
      .send({ from: account });
      window.location.reload();
  };
  return (
    <div className="flex bg-white shadow-lg m-2 p-4 rounded">
      <div>
        <img
          className="rounded-full  h-24 w-24 flex items-center justify-center"
          src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        />
      </div>
      <div className="flex flex-col justify-between ml-4">
        <h3 className="tracking-wide text-lg text-indigo-500 font-semibold">
          {title}
        </h3>
        <h2 className="text-gray-700">{description}</h2>
        <p className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700  mb-2">
          Goal: {goal} ETH
        </p>
      </div>
      <div className="flex flex-col items-center justify-end ml-auto">
        Balance: {current} ETH
        <br />
      </div>

      <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          checked={checked}
          onChange={(e) => toggleChecked(id)}
        />
        <label
          for="toggle"
          class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        ></label>
      </div>
      <label for="toggle" class="text-xs text-gray-700">
        Toggle me.
      </label>
    </div>
  );
};

export default TableCard;
