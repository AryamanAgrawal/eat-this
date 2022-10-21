// var express = require('express');
// var router = express.Router();

const rp = require('request-promise');
const cheerio = require('cheerio');
const cron = require('node-cron');

const dining = ['berkshire','hampshire','worcester','franklin'];

(async () => {
    
    dining.map(async(location) => {
        
        let url = 'https://umassdining.com/locations-menus/'+location+'/menu';
        //cron.schedule('30 * * * * *', async() => {
            let response = await rp(url);
            let $ = cheerio.load(response);
            let count = $('a').length;
            console.log("---------------------------"+location+"------------------------------"+"\n");
            for (let i = 0; i< count; i++){
                let test = $('a[data-ingredient-list]')[i.toString()];
                if (test !== undefined){
                    let dishname = test['attribs']['data-dish-name'].toString();
                    let ingredient = test['attribs']['data-ingredient-list'].toString();
                    let dish = {};
                    dish[dishname] = ingredient;
                    let dishJSON = JSON.stringify(dish);
                    console.log(location+":  "+ dishJSON + "\n");
                }
            }
        //});
    });
})();


// module.exports = router;
