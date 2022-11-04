
const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');

const fs = require('fs');

const dining = ['berkshire', 'hampshire', 'worcester', 'franklin'];
const mealtime = ['#breakfast_menu', '#lunch_menu', '#dinner_menu', '#latenight_menu', '#grabngo'];
const menu = {};

(async () => {
    let dc_time = '';
    cron.schedule('1 0 * * *', async() => { //disable for now
        dining.map(async (location) => {
        let url = 'https://umassdining.com/locations-menus/' + location + '/menu';      
            let response = await rp(url);
            let $ = cheerio.load(response);
            //console.log("---------------------------------"+location+"----------------------------------"+"\n");
            let dishlist = [];
            mealtime.map(async (t) => {
                if ($(t).html() !== null) {
                    //console.log("----------------------------------------------"+t+"----------------------------------------------");
                    $(t).find('div > li > a').each((index, elem) => {
                        dc_time = location + t;
                        let dish_attributes = $(elem)['0']['attribs'];
                        let dish = {}; // {dishname: [ingredient, allergens, nutritionValues]}
                        let dishname = dish_attributes['data-dish-name'].toString();
                        let ingredient = dish_attributes['data-ingredient-list'].toString().split(',');
                        let allergens = dish_attributes['data-allergens'].toString().split(',');
                        let nutritionValues = {
                            "calories" : dish_attributes['data-calories'].toString(),
                            "totalFat" : dish_attributes['data-total-fat'].toString(),
                            "cholesterol" : dish_attributes['data-cholesterol'].toString(),
                            "sodium" : dish_attributes['data-sodium'].toString(),
                            "totalCarb": dish_attributes['data-total-carb'].toString(),
                            "dietaryFiber" : dish_attributes['data-dietary-fiber'].toString(),
                            "sugars" : dish_attributes['data-sugars'].toString(),
                            "protein" : dish_attributes['data-protein'].toString()
                        };
                        dish[dishname] = {
                            "ingredients": ingredient,
                            "allergens": allergens,
                            "nutritionValues": nutritionValues
                        };
                        let dishJSON = JSON.stringify(dish);
                        dishlist.push(dishJSON);
                    });
                    menu[dc_time] = dishlist;
                    //{worcester#lunch_menu:[{dishname: [ingredient[], allergens[], nutritionValues{}},
                    //                       {dishname: [ingredient[], allergens[], nutritionValues]},...]}
                    //console.log(menu);
                    
                    
                    
                    fs.writeFileSync("dishdata.json", JSON.stringify(menu));
                }
            });

        });
    });

        // try {
        //     const response = await fetch('./dishdata.json').then((response) => response.json()).then((json) => console.log(json));;
        //   } catch (err) {
        //     console.log(err);
        //   }
})();

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
