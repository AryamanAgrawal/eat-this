/**
 *  see how many location matched with the food prfernce:
 * if match, get 1 point
 * if not match, get 0 point
 * sort the list of location with their macthing score
 * @param  food prference list, location list
 * @returns array of dining locations based on food preferece
 */

let userLocations = [], userAllgergens = [], userIngredients =[];

 let userPreference = {
    "_id": {
        "$oid": "6369f468b221e2e7d265056b"
    },//unique user food preference id
    "userId": "63629d6ad8308303c3383d37",
    "preferredLocation": [
        "636803f74459bcab97ecca75", // frank
        "636803044459bcab97ecca71" // worcester
    ],
    "allergens": [
        "Milk",
        "Corn",
        "Eggs"
    ],
    "ingredients": [
        "Chicken",
        "Mushrooms"
    ]
};


// TODO
// Then loop through the menus
// Score the menus according to matches
// output a list of scores for each dininglocation

//dininglocations baased on user geo location, the nearest list 
let diningLocations = ["636803f74459bcab97ecca75", "636803044459bcab97ecca71"];

// menus from frank, worcester
let dummyMenus = [
    {
        "_id": {
            "$oid": "6369a5314b8564d948c67c29"
        },
        "diningLocationName": "Franklin Dining Commons",
        "diningLocationId": "636803f74459bcab97ecca75",
        "mealType": "lunch",
        "foodIds": [
            {
                "$oid": "637d7453f08cb443c225f839"
            },
            {
                "$oid": "637d7453f08cb443c225f83a"
            },
            {
                "$oid": "637d7453f08cb443c225f83b"
            },
            {
                "$oid": "637d7453f08cb443c225f83c"
            },
            {
                "$oid": "637d7453f08cb443c225f83d"
            },
            {
                "$oid": "637d7453f08cb443c225f83e"
            },
        ]
    },
    {
        "_id": {
            "$oid": "6369a8314b8564d948c67c33"
        },
        "diningLocationName": "Worcester Dining Commons",
        "diningLocationId": "636803044459bcab97ecca71",
        "mealType": "lunch",
        "foodIds": [
            {
                "$oid": "637d7453f08cb443c225f785"
            },
            {
                "$oid": "637d7453f08cb443c225f786"
            },
            {
                "$oid": "637d7453f08cb443c225f787"
            },
            {
                "$oid": "637d7453f08cb443c225f788"
            },
            {
                "$oid": "637d7453f08cb443c225f789"
            },
            {
                "$oid": "637d7453f08cb443c225f78a"
            },
        ]
    }
];

// id: unique id object "$oid", dishname: string, 
//ingredients: string array, allgergens: strinng array,
// nutritionValues: nutrition object
let mushroomRice = {
    "_id": {
        "$oid": "637d7453f08cb443c225f71a"
    },
    "dishName": "Mushroom Rice",
    "ingredients": [ 
        "Greek",
        "Bella",
        "Rice",
        "AGRINO",
        "Greek",
        "Long",
        "Grain",
        "Parboiled",
        "Rice.",
        "SUB",
        "ASIANPRD",
        "White",
        "long",
        "grain",
        "rice",
        "SUB",
        "WEST",
        "CRK",
        "Long",
        "Grain",
        "Parboiled",
        "Rice",
        "Iron",
        "Phosphate",
        "Niacin",
        "Thiamin",
        "Mononitrate",
        "And",
        "Folic",
        "Acid",
        "Fresh",
        "Local",
        "Mushrooms",
        "Local",
        "Yellow",
        "Onions",
        "Canola",
        "Oil",
        "Garlic",
        "Cloves",
        "Gluten",
        "Free",
        "Vegetable",
        "Broth",
        "Vegetable",
        "Puree",
        "Celery",
        "Onions",
        "Carrots",
        "Parsnips",
        "Turnips",
        "Salt",
        "Cornstarch",
        "Tomato",
        "Paste",
        "Sugar",
        "Corn",
        "Oil",
        "or",
        "less",
        "of",
        "Natural",
        "Flavors",
        "Corn",
        "Powder",
        "Xanthan",
        "Gum",
        "Soybean",
        "Oil",
        "Canola",
        "Oil.",
        "SUB",
        "A",
        "Minor",
        "s",
        "Sauteed",
        "Vegetable",
        "Puree",
        "Mix",
        "Carrots",
        "Onions",
        "Celery",
        "Salt",
        "Sugar",
        "Maltodextrin",
        "Corn",
        "Oil",
        "Less",
        "Than",
        "Of",
        "Yeast",
        "Extract",
        "Water",
        "Potato",
        "Starch",
        "Xanthan",
        "Gum",
        "Natural",
        "Flavors",
        "Carrot",
        "Juice",
        "Concentrate.",
        "SUB",
        "B",
        "GOLD",
        "LABEL",
        "Sauteed",
        "Pureed",
        "Carrots",
        "Celery",
        "and",
        "Onions",
        "With",
        "Canola",
        "Oil",
        "Salt",
        "Sugar",
        "Hydrolyzed",
        "Corn",
        "Protein",
        "Onion",
        "Powder",
        "Yeast",
        "Extract",
        "Food",
        "Starch",
        "Modified",
        "Carrot",
        "Powder",
        "Turmeric",
        "Color",
        "Spice",
        "Extractives",
        "Citric",
        "Acid",
        "Italian",
        "Parsley",
        "Fresh",
        "Thyme",
        "Whole",
        "Bayleaves"
    ],
    "allergens": [
        "Soy",
        "Corn"
    ],
    "nutritionValues": {
        "calories": "103",
        "totalFat": "1.8g",
        "cholesterol": "0mg",
        "sodium": "33.2mg",
        "totalCarb": "18.6g",
        "dietaryFiber": "0.7g",
        "sugars": "0.2g",
        "protein": "1.8g"
    }
};

let buffaloChickenWrap = {
    "_id": {
        "$oid": "637d7453f08cb443c225f71d"
    },
    "dishName": "Buffalo Chicken Wrap",
    "ingredients": [
        "Plain",
        "Wrap",
        "Enriched",
        "Flour",
        "Wheat",
        "Flour",
        "Malted",
        "Barley",
        "Flour",
        "Niacin",
        "Reduced",
        "Iron",
        "Thiamine",
        "Mononitrate",
        "Riboflavin",
        "Folic",
        "Acid",
        "Water",
        "Sunflower",
        "Oil",
        "Cultured",
        "Wheat",
        "Flour",
        "Contains",
        "Less",
        "Than",
        "of",
        "each",
        "of",
        "the",
        "following",
        "Wheat",
        "Gluten",
        "Soy",
        "Lecithin",
        "Guar",
        "Gum",
        "Oat",
        "Fiber",
        "Potassium",
        "Chloride",
        "Yeast",
        "Salt",
        "Citric",
        "Acid",
        "Sodium",
        "Acid",
        "Pyrophosphate",
        "Baking",
        "Soda",
        "Corn",
        "Starch",
        "Monocalcium",
        "Phosphate",
        "Vinegar",
        "Natural",
        "Flavor",
        "Magnesium",
        "Carbonate.",
        "SUB",
        "MAYAN",
        "FARM",
        "Enriched",
        "Flour",
        "Wheat",
        "Flour",
        "Malted",
        "Barley",
        "Flour",
        "Niacin",
        "Reduced",
        "Iron",
        "Thiamine",
        "Mononitrate",
        "Riboflavin",
        "Folic",
        "Acid",
        "Water",
        "Interesterfied",
        "Soybean",
        "Oil",
        "and",
        "or",
        "Canola",
        "Oil",
        "Contains",
        "or",
        "less",
        "of",
        "each",
        "of",
        "the",
        "following",
        "Salt",
        "Mono",
        "and",
        "Diglycerides",
        "Guar",
        "Gum",
        "Calcium",
        "Propionate",
        "Baking",
        "Powder",
        "Sodium",
        "Acid",
        "Pyrophosphate",
        "Sodium",
        "Bicarbonate",
        "Corn",
        "Starch",
        "Monocalcium",
        "Phosphate",
        "Fumaric",
        "Acid",
        "Potassium",
        "Sorbate",
        "Wheat",
        "Gluten",
        "Sodium",
        "Bicarbonate",
        "Dough",
        "Conditioner",
        "Sodium",
        "Metabisulfitem",
        "Microcrystalline",
        "Cellulose",
        "Dicalcium",
        "Phosphate",
        "Halal",
        "Antibiotic",
        "Free",
        "Chicken",
        "Tenderloin",
        "Chicken",
        "Breast",
        "Raw.",
        "SUB",
        "FARM",
        "SMART",
        "Chicken",
        "MARZETTI",
        "Blue",
        "Cheese",
        "Dressing",
        "Canola",
        "Oil",
        "Filtered",
        "Water",
        "Blue",
        "Cheese",
        "Milk",
        "Cheese",
        "Cultures",
        "Salt",
        "Enzymes",
        "Buttermilk",
        "Distilled",
        "And",
        "White",
        "Wine",
        "Vinegars",
        "Egg",
        "Yolk",
        "Cane",
        "Sugar",
        "Salt",
        "Dried",
        "Garlic",
        "Yeast",
        "Extract",
        "Xanthan",
        "Gum",
        "Natural",
        "Flavor",
        "SUB",
        "VILLAGE",
        "Soybean",
        "Oil",
        "Water",
        "Blue",
        "Cheese",
        "High",
        "Fructose",
        "Corn",
        "Syrup",
        "Distilled",
        "Vinegar",
        "Buttermilk",
        "Solids",
        "Egg",
        "Yolks",
        "Salt",
        "Natural",
        "Flavor",
        "Xanthan",
        "Gum",
        "Propylene",
        "Glycol",
        "Alginate",
        "Monosodium",
        "Glutamate",
        "Sodium",
        "Benzoate",
        "and",
        "Potassium",
        "Sorbate",
        "Preservatives",
        "Buffalo",
        "Hot",
        "Sauce",
        "Distilled",
        "Vinegar",
        "Aged",
        "Cayenne",
        "Red",
        "Peppers",
        "Salt",
        "Water",
        "Canola",
        "Oil",
        "Paprika",
        "Xanthan",
        "Gum",
        "Corn",
        "Natural",
        "Butter",
        "Type",
        "Flavor",
        "and",
        "Garlic",
        "Powder",
        "Local",
        "Tomatoes",
        "Green",
        "Leaf",
        "Lettuce",
        "Pan",
        "Spray",
        "Canola",
        "Oil",
        "Caprylic",
        "Capric",
        "Triglycerides",
        "Phosphated",
        "Mono",
        "and",
        "Diglycerides",
        "Corn",
        "Silicon",
        "Dioxide",
        "Calcium",
        "Stearate",
        "Propellant.",
        "SUB",
        "A",
        "Vegalene",
        "Canola",
        "Oil",
        "Canola",
        "Lecithin",
        "Mono",
        "and",
        "Diglycerides",
        "Natural",
        "Flavor",
        "and",
        "Propellant"
    ],
    "allergens": [
        "Milk",
        "Eggs",
        "Gluten",
        "Soy",
        "Corn",
        "Wheat"
    ],
    "nutritionValues": {
        "calories": "421",
        "totalFat": "18g",
        "cholesterol": "62.2mg",
        "sodium": "918.3mg",
        "totalCarb": "38.6g",
        "dietaryFiber": "2.1g",
        "sugars": "1g",
        "protein": "22.9g"
    }
};

let foodItems = [mushroomRice, buffaloChickenWrap];


//START///////////////////////////////////////////////////////////////////////////////////////////////////////

userLocations = userPreference["preferredLocation"].map(x => x);
userAllergens = userPreference["allergens"].map(x => x);
userIngredients = userPreference["ingredients"].map(x => x);

let score = new Map();

//prefered location matching, if match get 1 point and record location
diningLocations.map((location) =>{

    userLocations.map((prefered) => {
        if (location.localeCompare(prefered)){
            score.set(prefered, 1);
        } 
    });
});


for(let location of score.keys()){
    //first step: get menu from database, concern: different meal time
    let menu = null;
    for (let m of dummyMenus){
        if (location.localeCompare(m["diningLocationId"])){
            menu = m["foodIds"];
            break;
        }
    }
    /**
     * if we got the menu from the database, we try to retrieve the dish ingredients, 
     * then loop through the ingredients list and  see if there's any matching.
     * For every matching(i.e. found matched ingredient and no allergens found), get 1 point.
    **/ 
    
     if (menu !== null){
        for (let dish of menu){
            let dishid = dish["$oid"];
            let discovered = null;
            for (let getdish of foodItems){
                if (dishid.localeCompare(getdish["_id"]["$oid"])){
                    discovered = getdish["ingredients"];
                    break;
                }
            }
            if (discovered !== null){
                discovered.map((ingredient) =>{
                    if (userIngredients.includes(ingredient) && !(userAllergens.includes(ingredient))){
                        score.set(location, score.get(location)+1);
                    }
                });
            }
            
        }
    }

}
console.log(score);  









