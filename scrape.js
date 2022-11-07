
const constants = require('./constants');
const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');

const fs = require('fs');

const dining = ['berkshire', 'hampshire', 'worcester', 'franklin'];
const mealTime = ['#breakfast_menu', '#lunch_menu', '#dinner_menu', '#latenight_menu', '#grabngo'];

const tokenizer = (attr, dishname) => {
    return attr.replace(dishname, "")
        .trim()
        .replace(constants.stopwords, "")
        .replace(/[^.,a-zA-Z]/g, ",")
        .split(",")
        .filter((x) => x.length > 0)
        .map((x) => x.trim())
}

async function scrapMenu() {
    let menu = {};
    let dc_time = '';

    dining.map(async (location) => {
        let url = 'https://umassdining.com/locations-menus/' + location + '/menu';
        let response = await rp(url);
        let $ = cheerio.load(response);

        let dishlist = [];
        mealTime.map(async (t) => {
            if ($(t).html() !== null) {
                $(t).find('div > li > a').each((i, elem) => {
                    dc_time = location + t;
                    let dishAttributes = $(elem)['0']['attribs'];
                    let dish = {};
                    let dishName = dishAttributes['data-dish-name'].toString().trim();
                    let ingredient = tokenizer(dishAttributes['data-ingredient-list'], dishName);
                    let allergens = tokenizer(dishAttributes['data-allergens'], dishName);
                    let nutritionValues = {
                        "calories": dishAttributes['data-calories'],
                        "totalFat": dishAttributes['data-total-fat'],
                        "cholesterol": dishAttributes['data-cholesterol'],
                        "sodium": dishAttributes['data-sodium'],
                        "totalCarb": dishAttributes['data-total-carb'],
                        "dietaryFiber": dishAttributes['data-dietary-fiber'],
                        "sugars": dishAttributes['data-sugars'],
                        "protein": dishAttributes['data-protein']
                    };
                    dish[dishName] = {
                        "dishName": dishName,
                        "ingredients": ingredient,
                        "allergens": allergens,
                        "nutritionValues": nutritionValues
                    };
                    dishlist.push(dish);
                });
                menu[dc_time] = dishlist;
                // fs.writeFileSync("dishdata.json", JSON.stringify(menu));
            }
        });

    });
    return menu;
}

async function test() {
    // let menu = await scrapMenu();
    // console.log("testing imports");
    // console.log(menu["worcester#lunch_menu"]);
    cron.schedule('* * * * *', () => {
        console.log('Scraping menu every 24 hours at 0100');
    });
}

module.exports = { test };

//module.exports = router;

//1) search by dining (aka worcester -> breakfast, lunch, dinner, late night, grab and go)
//2) populate "menus" collection
        // Location: dining location
        // FoodId:
        // MealTime:
        // Name of Dish:
//3) populate "foodItems" collection
        //ingredients:
        //allergens:
        //nutrionalValue:
        //calories:
        //cuisineType:
        //food_id: same as above
