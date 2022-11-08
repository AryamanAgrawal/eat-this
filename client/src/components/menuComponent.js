import React, { useEffect, useState } from 'react';

function Menu({diningLocationId}){
    //Menu Object
    const [menuData, setMenuData] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            // return menu object for the desired dinning commons
            const response = await fetch(`https://umasseatthis.herokuapp.com/menu/:${diningLocationId}`); 

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setMenuData(records.results); //store foodIds array
        }
        fetchData();
    }, [])

    //FoodItem Object
    const [foodData, setFoodData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            menuData.forEach(async foodId => {
                const response = await fetch(`https://umasseatthis.herokuapp.com/menu/:${foodId}`); // return menu object

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }

                const records = await response.json();
                setFoodData(records.results); //store foodIds array
            });
            
        }
        fetchData();
    }, [])

    const MenuComponent = () => (
        <>
            <div className="menu-container">
                {foodData.map((data, key) => (
                    <div key={key}>
                        {data.dishName}
                        <br/>
                    </div>
                ))}

            </div>
        </>
    )

    return (
        <MenuComponent/>
    );
}

export default Menu;