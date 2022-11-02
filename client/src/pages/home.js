import React from "react";
import DiningCard from "../components/diningCard";
import Survey from "../components/survey/survey";

const Home = () => {
  return (
    <div>
      {localStorage.getItem("token") ? (
        <h1 style={{ textAlign: "center" }}>Logged In</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>Home Page</h1>
      )}
      <div className="home-cards">
        <DiningCard />
      </div>

      <h1 style={{ textAlign: "center", marginTop: 25 }}>
        Set Your Preferences
      </h1>
      <Survey />
    </div>
  );
};

export default Home;
