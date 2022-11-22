import React, { Component } from "react";
import Survey from "../components/survey/survey";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
      preferenceData: "",
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      fetch(`https://umasseatthis.herokuapp.com/user/${localStorage.getItem("userId")}`, {
        method: "GET",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          this.setState({ userData: data.result });
        });
      fetch(
        `https://umasseatthis.herokuapp.com/user/preferences/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "GET",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({ preferenceData: data.result });
        });
    }
  }
  render() {
    return localStorage.getItem("token") ? (
      <>
        <div>
          <h1 style={{ textAlign: "center", marginTop: 25 }}>Your Details</h1>

          <h3>Name: {this.state.userData.firstName}</h3>
          <h3>Email: {this.state.userData.email}</h3>

          {this.state.preferenceData !== null ?
            <>
              <h1 style={{ textAlign: "center", marginTop: 25 }}>
                Your Preferences
              </h1>
               <h3>Ingredients: {this.state.preferenceData.ingredients}</h3>
              <h3>Allergens: {this.state.preferenceData.allergens}</h3>
             
              <h3>
                Preferred Location:{" "}
                {this.state.preferenceData.preferredLocation}
              </h3>
              <h1 style={{ textAlign: "center", marginTop: 25 }}>
                Edit Your Preferences
              </h1>
              <Survey type={"edit"} preferenceData={this.state.preferenceData} />
            </>
            :
            <>
              <h1 style={{ textAlign: "center", marginTop: 25 }}>
                Add Your Preferences
              </h1>
              <Survey preferenceData={this.state.preferenceData}/>
            </>
          }
        </div>
      </>
    ) : (
      <div>
        <h1>Log in to access</h1>
      </div>
    );
  }
}
