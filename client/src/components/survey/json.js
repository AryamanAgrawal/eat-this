export const json = {
    "elements": [
      {
        "type": "checkbox",
        "name": "ingredients",
        "title": "What ingredients do you prefer?",
        "isRequired": true,
        "colCount": 0,
        "showNoneItem": true,
        "choices": [ "Fish", "Chicken", "Tofu", "Veggies", "Beans", "Beef", "Pork" ]
      },
    
      {
        "type": "checkbox",
        "name": "allergens",
        "title": "Do you have any allergies?",
        "isRequired": true,
        "colCount": 0,
        "showNoneItem": true,
        "choices": [ "Milk", "Peanuts", "Shellfish", "Eggs", "Gluten", "Tree nuts", "Fish", "Soy", "Corn", "Seasame" ]
      },
      {
        "type": "checkbox",
        "name": "preferredLocation",
        "title": "What is your favorite dining hall?",
        "isRequired": true,
        "colCount": 0,
        "showNoneItem": true,
        "choices": [ "Worcester","Berkshire","Hampshire","Franklin","Tavola","Tamales","Harvest Cafe","Roots Cafe" ]
      },
      
    ],
    "completedHtml": "<h3>Preferences Updated</h3>",
  };