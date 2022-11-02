import React, { Component } from "react";
import Survey from "../components/survey/survey";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      fetch(`http://localhost:8000/user/${localStorage.getItem("userId")}`, {
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
    }
  }
  render() {
    return localStorage.getItem("token") ? (
      <>
        <div>
          Name<h1>{this.state.userData.firstName}</h1>
          Email <h1>{this.state.userData.email}</h1>
          <h1 style={{ textAlign: "center", marginTop: 25 }}>
            Edit Your Preferences
          </h1>
        </div>
        <Survey />
      </>
    ) : (
      <div>
        <h1>Log in to access</h1>
      </div>
    );
  }
}
