
const constants = require('./constants');
const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');
const ObjectId = require("mongodb").ObjectId;

const dining = [
    'berkshire', 'hampshire', 'worcester', 'franklin',
    'french-meadow-café', 'harvest-blue-wall-menu', 'tavola',
    'um-bakery-blue-wall-menu', 'green-fields-blue-wall', 'tamales-blue-wall-menu',
    'wasabi-blue-wall', 'deli-delish-blue-wall', 'star-ginger-blue-wall-menu',
    'grill-blue-wall-menu', 'paciugo-dining-menu'
];
const diningCampusCenter = [
    'french-meadow-café', 'harvest-blue-wall-menu', 'tavola',
    'um-bakery-blue-wall-menu', 'green-fields-blue-wall', 'tamales-blue-wall-menu',
    'wasabi-blue-wall', 'deli-delish-blue-wall', 'star-ginger-blue-wall-menu',
    'grill-blue-wall-menu', 'paciugo-dining-menu'
];

const mealType = ['#breakfast_menu', '#lunch_menu', '#dinner_menu', '#latenight_menu', '#grabngo'];
const dbo = require("./db/conn");

function getDiningLocationId(name) {
    let diningLocationId = "";
    if (name === "franklin") {
        diningLocationId = "636803f74459bcab97ecca75";
    } else if (name === "berkshire") {
        diningLocationId = "636803ac4459bcab97ecca74";
    } else if (name === "worcester") {
        diningLocationId = "636803044459bcab97ecca71";
    } else if (name === "hampshire") {
        diningLocationId = "636803734459bcab97ecca73";
    } else if (name === "french-meadow-café") {
        diningLocationId = "6376d2819d51035f3540cf08";
    } else if (name === "harvest-blue-wall-menu") {
        diningLocationId = "6376d2c89d51035f3540cf09";
    } else if (name === "tavola") {
        diningLocationId = "6376d31e9d51035f3540cf0a";
    } else if (name === "um-bakery-blue-wall-menu") {
        diningLocationId = "6376d3509d51035f3540cf0b";
    } else if (name === "green-fields-blue-wall") {
        diningLocationId = "6376d5e89d51035f3540cf0c";
    } else if (name === "tamales-blue-wall-menu") {
        diningLocationId = "6376d7879d51035f3540cf0d";
    } else if (name === "wasabi-blue-wall") {
        diningLocationId = "6376d9929d51035f3540cf0e";
    } else if (name === "deli-delish-blue-wall") {
        diningLocationId = "6376d9f59d51035f3540cf0f";
    } else if (name === "star-ginger-blue-wall-menu") {
        diningLocationId = "6376dacd9d51035f3540cf10";
    } else if (name === "grill-blue-wall-menu") {
        diningLocationId = "6376db529d51035f3540cf11";
    } else if (name === "paciugo-dining-menu") {
        diningLocationId = "6376dbc69d51035f3540cf12";
    }
    return diningLocationId;
}

const tokenizer = (attr, dishname) => {
    return attr.replace(dishname, "")
        .trim()
        .replace(constants.stopwords, "")
        .replace(/[^.,a-zA-Z]/g, ",")
        .split(",")
        .filter((x) => x.length > 0)
        .map((x) => x.trim())
}

async function scrapeMenu() {

    let menu = {};

    for (let i = 0; i < dining.length; i++) {
        let url = "";
        if (dining[i] in diningCampusCenter) {
            url = 'https://umassdining.com/menu/' + dining[i];
        }
        else { url = 'https://umassdining.com/locations-menus/' + dining[i] + '/menu'; }
        let response = await rp(url);
        let $ = cheerio.load(response);
        let location = dining[i];
        let dishList = [];
        menu[location] = {};

        for (let j = 0; j < mealType.length; j++) {
            let t = mealType[j];
            if ($(t).html() !== null) {
                $(t).find('div > li > a').each((i, elem) => {
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
                    dish = {
                        "dishName": dishName,
                        "ingredients": ingredient,
                        "allergens": allergens,
                        "nutritionValues": nutritionValues,
                    };
                    dishList.push(dish);
                });
                const time = t.replace("#", "").replace("_menu", "");
                menu[location][time] = dishList;
            } else {

            }
        }
    }
    // let menu = [menu_frank, menu_berk, menu_woo, menu_hamp]
    // for (let k in menu) {
    //     for (let j in menu[k]) {
    //         console.log(menu[k][j]);
    //     }
    // }

    return menu;
}

async function uploadMenuData() {
    let menu = await scrapeMenu();
    let db_connect = dbo.getDb();

    for (let i in menu) {

        for (let mealType in menu[i]) {

            const foodItems = menu[i][mealType];

            db_connect.collection("foodDummy").deleteMany({});
            db_connect.collection("foodDummy").insertMany(foodItems, { ordered: false }, function (err, result1) {
                if (err) {
                    // console.log(err);
                    return
                };

                let foodIds = [];
                for (let id in result1.insertedIds) {
                    foodIds.push(result1.insertedIds[id]);
                }

                let diningLocationId = getDiningLocationId(i);

                myfindQuery = { diningLocationId: diningLocationId, mealType: mealType };

                let newMenu = {
                    $set: {
                        foodIds: foodIds,
                    },
                };

                db_connect.collection("menuDummy").updateOne(myfindQuery, newMenu, { upsert: true }, function (err, result2) {
                    if (err) {
                        // console.log(err);
                        return;
                    };
                });
            });
        }
    }

}

cron.schedule('* * * * *', () => {
    uploadMenuData();
    console.log('Scraping menu every 24 hours at 01:00');
});


// module.exports = { scheduleScrape }