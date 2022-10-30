import React from "react";
import DiningCard from "../components/diningCard"

const Home = () => {
  return (
    <div>
      {localStorage.getItem("userData") ? (<h1 style={{ "textAlign": "center" }}>
        Welcome to Umass Eat This!
      </h1>):
      (<h1 style={{ "textAlign": "center" }}>
        Home Page
      </h1>)}
      <div className="home-cards">
        <DiningCard />
      </div>
    </div>
  );
};

export default Home;