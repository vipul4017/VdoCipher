import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Header from '../containers/header/header.container';
import Home from '../containers/home/home.container';

export default (

    <Router>
            <Route exact path="*" component={Header} />
            <Route exact path="/" component={Home} />
    </Router>

)