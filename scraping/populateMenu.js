const fs = require('fs');
const data = fs.readFileSync('dishdata.json','utf-8');

const dishes = JSON.parse(data);//=> object XDDDD
fs.writeFileSync("test.json", JSON.stringify(dishes));
//console.log(JSON.stringify(dishes));

const dining = ['berkshire', 'hampshire', 'worcester', 'franklin'];
const mealtime = ['#breakfast_menu', '#lunch_menu', '#dinner_menu', '#latenight_menu', '#grabngo'];

for (let location = 0; location < dining.length; location++){
    for(let t = 0; t < mealtime.length; t++){
        let key = dining[location] + mealtime[t];
        if (dishes[key] !== null){
                //console.log(key);
                for (let d in dishes[key]){
                        //console.log(`${d}: ${dishes[key][d]}`);
                        const thisdish = JSON.parse(dishes[key][d]);
                        //console.log(Object.keys(thisdish));
                        let list = Object.keys(thisdish);
                        list.forEach((name) => { //name is the dish name, and thisdish[name] is the [ingredient, allergens, nutritionValues];
                                console.log(`${thisdish[name]} --> ${name}`);
                        });
                        
                        // let val = Object.values(thisdish);
                        // console.log(val[0]);                        
                        
                        //populate menus
                        //location: dining[location]
                        //foodId: 
                        //MealTime: mealtime[t]
                        //Name of Dish: Object.keys(thisdish)

                        //populate fooditems
                        //ingredients: 
                        //allergens:
                        //nutrionalValue:
                        //calories:
                        //cuisineType:
                        //food_id: same as above
                }
        }
    }

}
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