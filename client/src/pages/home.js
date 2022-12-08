import React from "react";
import "./home.css";
import Button from 'react-bootstrap/Button';
import DiningOnCampus from "../components/diningOnCampus";
import DiningOffCampus from "../components/diningOffCampus";

const Home = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("type");
  if (myParam === "Ctrue"){
    alert("You have successfully saved your preferences!");
  }
  else if (myParam === "Etrue"){
    alert("You have successfully edited your preferences!");
  }
  return (
    <div>
      {localStorage.getItem("token") ? (
        <h3 className="headerText">Welcome</h3>
      ) : (
        <h3 className="headerText">In A Rush? Pick one</h3>
      )}
      
      <div><a href="/diningPage"><Button className="seeAllButton">See All</Button></a></div>
      <div className="home-cards">
        <DiningOnCampus/>
        <DiningOffCampus/>
      </div>   
    </div>
  );
};

export default Home;
