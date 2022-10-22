import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import DiningCard from "./components/dinningCard";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import cardData from "./cardData";
// import "./components/cardindex.css"


const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<RecordList />} />
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
            <div className="home-cards">
                <DiningCard />
                {/* <DiningCard deatails={cardData} /> */}
                {/* <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Col>
                        <DiningCard deatails={cardData} />
                    </Col>
                ))}
                </Row> */}
            </div>
            
        </div>

        
    );
};

export default App;

