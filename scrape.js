var express = require('express');
var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');

(async () => {
    let url = 'https://umassdining.com/locations-menus/berkshire/menu';
    cron.schedule('10 * * * * *', async() => {
        let response = await rp(url);
        let $ = cheerio.load(response);
        let count = $('a').length;
        for (let i = 0; i< count; i++){
            let test = $('a[data-ingredient-list]')[i.toString()];
            if (test !== undefined){
                let name = test['attribs']['data-dish-name'].toString();
                let ingredient = test['attribs']['data-ingredient-list'].toString();
                let dish = {name : ingredient};
                let dishJSON = JSON.stringify(dish);
                console.log(dishJSON + "\n");
            }
        }
    });

})();


module.exports = router;