var express = require('express');
var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');

(async () => {
    let url = 'https://umassdining.com/locations-menus/berkshire/menu';
    //cron.schedule('* * * * * *', async() => {
        let response = await rp(url);
        let $ = cheerio.load(response);
        let count = $('a').length;
        for (let i = 0; i< count; i++){
            let test = $('a[data-ingredient-list]')[i.toString()];
            if (test !== undefined){
                let dishname = test['attribs']['data-dish-name'].toString();
                let ingredient = test['attribs']['data-ingredient-list'].toString();
                let dish = {};
                dish[dishname] = ingredient;
                let dishJSON = JSON.stringify(dish);
                console.log(dishJSON + "\n");
            }
        }
    //});

})();


module.exports = router;
