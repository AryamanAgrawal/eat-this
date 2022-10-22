import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState} from 'react';

function DiningCard() {
    const [diningData, setdiningData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8000/dining/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            console.log(records);
            setdiningData(records.result);
        }
        fetchData();
    },[])
  return (
    <Row gutter={40} style={{padding:'25px'}}>
    {diningData.map((value, index) => (
        <Col style={{padding:'25px'}}>
        <Card style={{ width: '40rem'}} key={index}>
         <Card.Img variant="top" src={value.img} alt="dinning images"/>
         <Card.Body>
           <Card.Title>{value.name}</Card.Title>
           <Card.Text>
             {value.location}
           </Card.Text>
         </Card.Body>
       </Card>
        </Col> 
    ))}
    </Row>
  );
};

export default DiningCard;