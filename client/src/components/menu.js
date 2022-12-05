
import React, { useEffect } from 'react';

function Menu({ diningLocationId }) {
    //Menu Object
    // const [menuData, setMenuData] = useState([]);
    // const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        let menuData = [];
        let foodData = [];

        const fetchMenuData = async () => {

            try {
                // return menu object for the desired dinning commons                
                const response = await fetch(`http://localhost:8000/menu/dining/${diningLocationId}`);

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }
                const records = await response.json();
                if (!response.ok) {
                    throw new Error(records.message);
                }
                menuData = records.result[0].foodIds;
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
                foodData = responseData;
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
                {/* {foodData.map((data, key) => (
                    <div key={key}>
                        {data.dishName}
                        <br/>
                    </div>
                ))} */}
            </div>
        </>
    )

    return (
        <MenuComponent />
    );
}

export default Menu;