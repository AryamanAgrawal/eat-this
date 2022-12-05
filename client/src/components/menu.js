import { SystemSecurityUpdate } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

function Menu({diningLocationId}){
    //Menu Object
    const [menuData, setMenuData] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            // return menu object for the desired dinning commons
            console.log(diningLocationId);
            const response = await fetch(`http://localhost:8000/menu/dining/${diningLocationId}`); 
            
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
        
            const records = await response.json();
            // console.log(records.result[0].foodIds);
            setMenuData(records.result[0].foodIds); //store foodIds array of the first menu
        }
        fetchData();
    }, [])

    //FoodItem Object
    const [foodData, setFoodData] = useState([]);

        console.log(menuData);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                foodIds: ["637d7453f08cb443c225f708", "637d7453f08cb443c225f709", "637d7453f08cb443c225f70b", "637d7453f08cb443c225f718", "637d7453f08cb443c225f71d"] // Use your own property name / key
            })
        };

        fetch('http://localhost:8000/foods', requestOptions)
            .then(response => response.json())
            .then(data => setFoodData(data.result))
            .catch((err) => console.log(foodData));

        console.log(foodData);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         menuData.forEach(async foodId => {
    //             const response = await fetch(`http://localhost:8000/foods`); // return menu object

    //             if (!response.ok) {
    //                 const message = `An error occurred: ${response.statusText}`;
    //                 window.alert(message);
    //                 return;
    //             }

    //             const records = await response.json();
    //             setFoodData(records.results); //store foodIds array
    //         });
            
    //     }
    //     fetchData();
    // }, [])

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
        <MenuComponent/>
    );
}

export default Menu;