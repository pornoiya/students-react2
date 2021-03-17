import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import NewStudentPage from "./components/NewStudentPage/NewStudentPage";
import SuccessResponse from "./components/Responses/SuccessResponse";
import FailResponse from "./components/Responses/FailResponse";

class App extends Component {
    render() {
        return (
            <body>
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/' component={ MainPage } />
                    <Route exact path='/addStudent' component={ NewStudentPage } />
                    <Route exact path='/responseSuccess' component={ SuccessResponse } />
                    <Route exact path='/responseFail' component={ FailResponse } />
                </Switch>
            </Router>
            </body>
        );
    }
}

export default App;