import React from "react";
import './App.css';
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import DiningCard from "./components/diningCard";

import Home from './pages/home';
import Dining from './pages/dining';
import User from './pages/user';
import LogIn from './pages/login';
import SignUp from './pages/signup';

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/dining' element={<Dining/>} />
                <Route path='/user' element={<User/>} />
                <Route path='/login' element={<LogIn/>} />
                <Route path='/signup' element={<SignUp/>} />
                {/* <Route exact path="/" element={<RecordList />} /> */}
                <Route path="/edit/:id" element={<Edit />} />
                <Route path="/create" element={<Create />} />
            </Routes>
            <div className="home-cards">
                <DiningCard />
            </div>
            
        </div>

        
    );
};

export default App;

