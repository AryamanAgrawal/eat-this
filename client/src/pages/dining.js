import React from "react";
import "./dining.css"
import DiningCard from "../components/diningCard";

const Dining = () => {
  return (
    <div>
      <h3 className="headerText">
        All nearby dining options
      </h3>
      <DiningCard/>
    </div>
  );
};
  
export default Dining;