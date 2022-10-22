// var express = require('express');
// var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');

const dining = ['berkshire','hampshire','worcester','franklin'];

(async () => {
    
    dining.map(async(location) => {
        
        let url = 'https://umassdining.com/locations-menus/'+location+'/menu';
        //cron.schedule('0 1 * * *', async() => {
            let response = await rp(url);
            let $ = cheerio.load(response);
            let count = $('a').length;
            console.log("---------------------------"+location+"------------------------------"+"\n");
            for (let i = 0; i< count; i++){
                let test = $('a[data-ingredient-list]')[i.toString()];
                if (test !== undefined){
                    //dishname: ingredient, allergens, nutritionValues, cusineType(?)
                    let dishname = test['attribs']['data-dish-name'].toString();
                    let ingredient = test['attribs']['data-ingredient-list'].toString();
                    let allergens = test['attribs']['data-allergens'].toString();
                    
                    let nutritionValues = [
                        test['attribs']['data-calories'].toString(),
                        test['attribs']['data-total-fat'].toString(),
                        test['attribs']['data-cholesterol'].toString(),
                        test['attribs']['data-sodium'].toString(),
                        test['attribs']['data-total-carb'].toString(),
                        test['attribs']['data-dietary-fiber'].toString(),
                        test['attribs']['data-sugars'].toString(),
                        test['attribs']['data-protein'].toString()
                    ];
                    let dish = {};
                    dish[dishname] = [ingredient, allergens, nutritionValues];
                    let dishJSON = JSON.stringify(dish);
                    console.log(location+":  "+ dishJSON + "\n");
                }
            }
        //});
    });
})();


// module.exports = router;
