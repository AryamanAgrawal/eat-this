import { React} from "react";

import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { useNavigate } from "react-router";

import "survey-core/modern.css";
import "survey-core/defaultV2.css";

import { json } from "./json";

StylesManager.applyTheme("modern");

function saveSurveyResults(url, json) {
  const request = new XMLHttpRequest();
  request.open("POST", url);
  request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  request.addEventListener("load", () => {
    // Handle "load"
  });
  request.addEventListener("error", () => {
    // Handle "error"
  });
  request.send(JSON.stringify(json));
}

function SurveyComponent({ type, preferenceData }) {

  const navigate = useNavigate();

  const surveyComplete = (sender) => {
    const data = {
      userId: localStorage.getItem("userId"),
      preferredLocation: sender.data["preferredLocation"],
      allergens: sender.data["allergens"],
      ingredients: sender.data["ingredients"],
    };
    if (type === "edit") {
      saveSurveyResults(`https://umasseatthis.herokuapp.com/user/preferences/${localStorage.getItem("userId")}/edit`, data);
      navigate("/?type=Etrue");
    } else {
      saveSurveyResults("https://umasseatthis.herokuapp.com/user/preferences", data);
      navigate("/?type=Ctrue");
    }
  };

  const survey = new Model(json);
  survey.onComplete.add(surveyComplete);
  if (preferenceData !== null) { // Checks if user has already completed survey once
    var res = {}
    res = {
      data: {
        ingredients: preferenceData.ingredients,
        allergens: preferenceData.allergens,
        preferredLocation: preferenceData.preferredLocation,

      }
    }
    if (res.data) 
      survey.data = res.data;
  }
  return <Survey model={survey} />;
}

export default SurveyComponent;
