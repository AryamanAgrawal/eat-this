import React, { useEffect, useState } from "react";

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // This method fetches the records from the database.
    useEffect(() => {
        async function getRecords() {
            const response = await fetch(`http://localhost:8000/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();

        return;
    }, [records.length]);
}

// const cardData = [
//     {img:"https://umassdining.com/sites/default/files/worcester_commons_new.jpg",
//     name:"Worecester",
//     location:"123 Way"},
//     {img:"https://umassdining.com/sites/default/files/hampshire%20_resized.jpg",
//     name:"Hampshire",
//     location:"456 Way"},
//     {img:"https://umassdining.com/sites/default/files/worcester_commons_new.jpg",
//     name:"Franklin",
//     location:"123 Way"},
//     {img:"https://umassdining.com/sites/default/files/hampshire%20_resized.jpg",
//     name:"Berkshhire",
//     location:"456 Way"}
// ];

// export default cardData;