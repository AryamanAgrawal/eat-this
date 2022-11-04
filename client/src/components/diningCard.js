import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

import "./diningCard.css"
import Modal from "react-modal";

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

    const [isOpen, setIsOpen] = useState(false);
    const [selectedInd, setSelectedInd] = React.useState(-1);
    const modal = selectedInd >= 0 && (diningData && diningData.length > selectedInd);


    function toggleModal() {
        setIsOpen(!isOpen);
    }


    const DiningComponent = () => (
        <>
            <Container>
                <Row guter={40} className="row">
                    {diningData.map((value, index) => (
                        <Col key={index} xs={12} md={6} lg={6}>
                            <Card onClick={() => { setSelectedInd(index); setIsOpen(true); }}>
                                <Card.Img src={value.image} alt="dining images" />
                                <Card.Body>
                                    <Card.Title className='card title'><span className="badge bg-success">{value.onCampus ? "On Campus" : "Off Campus"}</span>{value.name} </Card.Title>
                                    <Card.Text className="cardlocation">{value.location}</Card.Text>

                                </Card.Body>
                            </Card>


                        </Col>
                    ))}
                </Row>
            </Container>

            {modal && <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
                className='modal'
            >

                {/* google icon style sheet  */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

                <div className='modal-container-first'>
                    <img className='modal-image' src={diningData[selectedInd].image} alt="dining images" />
                    <div className='modal-name-bottom-left'>{diningData[selectedInd].name}</div>
                    <div className='modal-button-close'>
                        <Button variant="danger" onClick={toggleModal}>
                            <span class="material-symbols-outlined">close</span>
                        </Button>
                    </div>
                </div>
                <div className='modal-container-second'>
                    <div className='modal-address'>{diningData[selectedInd].location}</div>
                    <div className='modal-button-nav'>
                        <Button variant="success" onClick={toggleModal}>
                            <div className='modal-button-nav-text'>Navigate</div>
                            <span className="material-symbols-outlined">navigation</span>
                        </Button>
                    </div>
                </div>
                <div className='modal-container-third'>
                    <div class="modal-menu-scroll">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when a
                        n unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                        software like Aldus PageMaker including versions of Lorem Ipsum. It is a long
                        established fact that a reader will be distracted by the readable content of a page
                        when looking at its layout. The point of using Lorem Ipsum is that it has a
                        more-or-less normal distribution of letters, as opposed to using 'Content here,
                        content here', making it look like readable English. Many desktop publishing packages
                        and web page editors now use Lorem Ipsum as their default model text, and a search
                        for 'lorem ipsum' will uncover many web sites still in their infancy.
                    </div>
                </div>


            </Modal>}
        </>
    )

    return (
        <DiningComponent />
    );
};

export default DiningCard;