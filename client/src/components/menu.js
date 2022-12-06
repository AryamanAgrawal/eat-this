import React, { useEffect, useState } from 'react';

function Menu({ diningLocationId }) {

    const [foodName, setFoodName] = useState('');

    useEffect(() => {
        // let menuData = [];
        let foodData = [];

        //Menu Object
        const fetchMenuData = async () => {

            try {
                // return menu object for the desired dinning commons                
                const response = await fetch(`http://localhost:8000/menu/dining/${diningLocationId}`);

                const records = await response.json();
                if (!response.ok) {
                    throw new Error(records.message);
                }

                // menuData = records.result[0].foodIds;
                //store foodIds array of the first menu   
            } catch (e) {
                console.log(e);
            }
        }

        //FoodItem Object
        const fetchFoodData = async () => {

            const foodIds = ["637d7453f08cb443c225f708", "637d7453f08cb443c225f709", "637d7453f08cb443c225f70b", "637d7453f08cb443c225f718", "637d7453f08cb443c225f71d"];
            let requestBody = { foodIds: foodIds };
            try {
                const response = await fetch("http://localhost:8000/foods", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody)
                });
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                foodData = responseData.result;
                var foodNametemp = '';
                foodData.forEach(d => foodNametemp += d.dishName + "<br />");
                setFoodName(foodNametemp);
            } catch (e) {
                console.log(e);
            }
        }
        fetchMenuData();
        fetchFoodData();

    }, [diningLocationId]);

    const MenuComponent = () => (
        <>
            <div className="menu-container">
                <p dangerouslySetInnerHTML={{ __html: foodName }} />
            </div>
        </>
    )

    return (
        <MenuComponent />
    );
}

export default Menu;