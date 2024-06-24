import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Appeal from "./Appeal";
import Confirm from "./Confirm";
import Confirm2 from "./Confirm2";
import Confirm3 from "./Confirm3";
import Wait from "./Wait";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/appeals" element={<Appeal />} />
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/confirm/2fa" element={<Confirm2 />} />
                <Route path="/confirm/2fa/3" element={<Confirm3 />} />
                <Route path="/wait" element={<Wait />} />
            </Routes>
        </Router>
    );
}

export default App;
