import React from "react";
import DiningCard from "../components/diningCard";

const Home = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("type");
  console.log(myParam);
  if (myParam === "Ctrue"){
    alert("You have successfully saved your preferences!");
  }
  else if (myParam === "Etrue"){
    alert("You have successfully edited your preferences!");
  }
  return (
    <div>
      {localStorage.getItem("token") ? (
        <h1 style={{ textAlign: "center" }}>Logged In</h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>Home Page</h1>
      )}
      <div className="home-cards">
        <DiningCard/>
      </div>
    </div>
  );
};

export default Home;
