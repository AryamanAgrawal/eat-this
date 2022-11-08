
const constants = require('./constants');
const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');
const ObjectId = require("mongodb").ObjectId;

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
                    dish = {
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
    let menu = [menu_frank, menu_berk, menu_woo, menu_hamp]
    // for (let k in menu) {
    //     for (let j in menu[k]) {
    //         console.log(menu[k][j]);
    //     }
    // }
    return [menu_frank, menu_berk, menu_woo, menu_hamp]
    // 0: frank, 1: berk, 2: woo, 3: hamp
}

async function uploadMenuData() {
    let menu = await scrapeMenu();
    let db_connect = dbo.getDb();

    for (let i = 0; i < menu.length; i++) {
        let menuLocation = menu[i];
        let diningLocationName = "";
        let diningLocationId = "";

        if (menuLocation === "franklin") {
            diningLocationName = "Franklin Dining Commons";
            diningLocationId = "636803f74459bcab97ecca75";
        } else if (menuLocation === "berkshire") {
            diningLocationName = "Berkshire Dining Commons";
            diningLocationId = "636803ac4459bcab97ecca74";
        } else if (menuLocation === "worcester") {
            diningLocationName = "Worcester Dining Commons";
            diningLocationId = "636803044459bcab97ecca71";
        } else if (menuLocation === "hampshire") {
            diningLocationName = "Hampshire Dining Commons";
            diningLocationId = "636803734459bcab97ecca73";
        }

        // menu Object
        // { 
        //     "_id": { "$oid": "6358488ee819be9655f5882f" }, 
        //     "foodIds": ["1", "2"], 
        //     "mealType": "breakfast", 
        //     "diningLocation": "636803044459bcab97ecca71" 
        // }        
        for (let mealType in menu[i]) {

            const foodItems = menu[i][mealType];



            console.log("Made it to db statement");
            db_connect.collection("foodDummy").remove({});
            db_connect.collection("foodDummy").updatetMany(foodItems, function (err, result1) {
                if (err) {
                    console.log(err);
                    return;
                };
                foodIds = result1.insertedIds;

                console.log("Inserted foodIds");
                myfindQuery = { diningLocationId: ObjectId(diningLocationId), mealType: mealType };
                let newMenu = {
                    $set: {
                        foodIds: foodIds,
                    },
                };
                db_connect.collection("menus").updateOne(myfindQuery, newMenu, function (err, result2) {
                    if (err) {
                        console.log(err);
                        return;

                    };
                });
                console.log("updated menus");
            });
        }
    }

}


cron.schedule('* * * * *', () => {
    uploadMenuData();
    console.log('Scraping menu every 24 hours at 01:00');
});


// module.exports = { scheduleScrape }