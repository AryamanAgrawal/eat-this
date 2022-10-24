import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from "react-bootstrap";
import "./diningCard.css"

function DiningCard() {
    const [diningData, setDiningData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://umasseatthis.herokuapp.com/dining`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setDiningData(records.result);
        }
        fetchData();
    }, [])
    return (
        <Container>
            <Row guter={40} className="row">
                {diningData.map((value, index) => (
                    <Col key={index} xs={12} md={6} lg={6}>
                        <Card class="shadow" >
                            <Card.Img src={value.image} alt="dining images" />
                            <Card.Body>
                                <Card.Title>{value.name} <span class="badge bg-success">{value.onCampus ? "On Campus" : "Off Campus"}</span></Card.Title>
                                <Card.Text>{value.location}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}
            </Row>
        </Container>

    );
};

export default DiningCard;