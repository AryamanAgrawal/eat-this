import { React, useCallback } from "react";

import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

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

function SurveyComponent({ type }) {

  const surveyComplete = useCallback((sender) => {
    const data = {
      userId: localStorage.getItem("userId"),
      preferredLocation: sender.data["preferredLocation"],
      allergens: sender.data["allergens"],
      ingredients: sender.data["ingredients"],
    };
    if (type === "edit") {
      saveSurveyResults(`https://umasseatthis.herokuapp.com/user/preferences/${localStorage.getItem("userId")}/edit`, data);
    } else {
      saveSurveyResults("https://umasseatthis.herokuapp.com/user/preferences", data);
    }
  }, [type]);

  const survey = new Model(json);
  survey.onComplete.add(surveyComplete);
  return <Survey model={survey} />;
}

export default SurveyComponent;
