import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import "./diningCard.css"
import Modal from "react-modal";
import { getDistance } from 'geolib';
import useCurrentLocation from "../components/geo-location";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationArrow } from '@fortawesome/fontawesome-free-solid'
import Menu from "./menu"

const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
    maximumAge: 1000 * 60 * 5, // 5 mins
};

function DiningCard() {
    const { location, error} = useCurrentLocation(geolocationOptions);
    console.log(error);
    const [diningData, setDiningData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // const response = await fetch(`https://umasseatthis.herokuapp.com/dining`);
            const response = await fetch(`http://localhost:8000/dining`);
            

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();

            if (location === undefined) {            
                setDiningData(records.result);              
            }else{
                const diningArray = records.result;
                diningArray.sort((a,b)=> {
                    const aDistance = getDistance(location,{latitude : a.location.latitude, longitude: a.location.longitude});
                    const bDistance = getDistance(location,{latitude : b.location.latitude, longitude: b.location.longitude});
                    return  aDistance - bDistance; 
                })
                console.log(diningArray);
                setDiningData(diningArray);
            }

        }
        fetchData();
    }, [location])

    const [isOpen, setIsOpen] = useState(false);
    const [selectedInd, setSelectedInd] = React.useState(-1);
    const modal = selectedInd >= 0 && (diningData && diningData.length > selectedInd);


    function toggleModal() {
        setIsOpen(!isOpen);
    }

    const openURL = url => {
        window.open(url,'_blank','noopener,noreferrer');

    };


    const DiningComponent = () => (
        <>
            <Container>
                <Row guter={40} className="row">
                    {diningData.map((value, index) => (
                        <Col key={index} xs={12} md={6} lg={6}>
                            <Card onClick={() => { setSelectedInd(index); setIsOpen(true); }}>
                                <Card.Img src={value.image} alt="dining images" />
                                <Card.Body>
                                    <Card.Title className='card-title'><div className="card-rank"><p className="badge bg-dark">{index + 1}</p><span className="badge bg-success">{value.onCampus ? "On Campus" : "Off Campus"}</span></div><p>{value.name}</p> </Card.Title>
                                    <Card.Text className="cardlocation">{value.location.address}</Card.Text>

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
                ariaHideApp={false}
            >

                {/* google icon style sheet  */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

                <div className='modal-container-first'>
                    <img className='modal-image' src={diningData[selectedInd].image} alt="dining images" />
                    <div className='modal-name-bottom-left'>{diningData[selectedInd].name}</div>
                    <div className='modal-button-close'>
                        <Button variant="danger" onClick={toggleModal}>
                            <span className="material-symbols-outlined">close</span>
                        </Button>
                    </div>
                </div>
                <div className='modal-container-second'>
                    <div className='modal-address'>{diningData[selectedInd].location.address}</div>
                    <div className='modal-button-nav'>
                        <Button variant="success" onClick = {() => openURL('https://www.google.com/maps/dir/?api=1&origin=' + location.latitude + ',' + location.longitude + '&destination=' + diningData[selectedInd].location.latitude + ',' + diningData[selectedInd].location.longitude + '&travelmode=walking')}>
                            <div className='modal-button-nav-text'>Navigate</div> 
                            <FontAwesomeIcon icon={faLocationArrow}/>          
                        </Button>
                    </div>
                </div>
                <div className='modal-container-third'>
                    <div className="modal-menu-scroll">
                        <Menu 
                            diningLocationId={diningData[selectedInd]._id}/>
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