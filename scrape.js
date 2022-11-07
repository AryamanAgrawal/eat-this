
const constants = require('./constants');
const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');

const dining = ['berkshire', 'hampshire', 'worcester', 'franklin'];
const mealType = ['#breakfast_menu', '#lunch_menu', '#dinner_menu', '#latenight_menu', '#grabngo'];
const dbo = require("./db/conn");

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

    let menu_frank = {};
    let menu_berk = {};
    let menu_woo = {};
    let menu_hamp = {};

    for (let i = 0; i < dining.length; i++) {
        let url = 'https://umassdining.com/locations-menus/' + dining[i] + '/menu';
        let response = await rp(url);
        let $ = cheerio.load(response);
        let location = dining[i];
        let dishList = [];

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
                    dish[dishName] = {
                        "dishName": dishName,
                        "ingredients": ingredient,
                        "allergens": allergens,
                        "nutritionValues": nutritionValues,
                    };
                    dishList.push(dish);
                });
                const time = t.replace("#", "").replace("_menu", "");
                if (location === "franklin") {
                    menu_frank[time] = dishList;
                } else if (location === "berkshire") {
                    menu_berk[time] = dishList;
                } else if (location === "worcester") {
                    menu_woo[time] = dishList;
                } else if (location === "hampshire") {
                    menu_hamp[time] = dishList;
                }
            }
        }
    }

    return [menu_frank, menu_berk, menu_woo, menu_hamp]
    // 0: frank, 1: berk, 2: woo, 3: hamp
}

async function uploadMenuData() {
    let menu = await scrapeMenu();

    for (let i = 0; i < dining.length; i++) {
        let menuLocation = dining[i];
        let diningLocationName = "";

        if (menuLocation === "franklin") {
            diningLocationName = "Franklin Dining Commons";
        } else if (menuLocation === "berkshire") {
            diningLocationName = "Berkshire Dining Commons";
        } else if (menuLocation === "worcester") {
            diningLocationName = "Worcester Dining Commons";
        } else if (menuLocation === "hampshire") {
            diningLocationName = "636803734459bcab97ecca73";
        }

        db_connect.collection("dinigLocations").findOne({ name: diningLocationName }, function (err, result) {
            if (err) throw err;
            res.status(200).json({ message: "Success: Fetched user", result });
            diningLocationId = result._id;
        });

        db_connect.collection("foodItems").updateMany(myobj, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Dining location insert failed", err });
            };
            res.status(200).json({ message: "Success: Dining location inserted", result });
        });
    }

}

async function test() {
    let db_connect = await dbo.getDb();
    console.log(db_connect);
    let myquery = { name: "Worcester Dining Commons" };
    if (db_connect) {
        db_connect.collection("dinigLocations").findOne(myquery, function (err, result) {
            if (err) {
                res.status(404).json({ message: "Failed to fetch dining location", err });
                throw err;
            }
            console.log(result)
        });
    }
}
// test();

// console.log("testing imports");
// console.log(menu["worcester#lunch_menu"]);
cron.schedule('* * * * *', () => {
    test()
    console.log('Scraping menu every 24 hours at 0100');
});

// module.exports = { test }