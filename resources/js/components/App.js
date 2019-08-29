import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './Header'
import Index from './user/Index'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                <Header/>

                    <Switch>
                        <Route path='/' component={Index} exact/>
                    </Switch>
                </div>
            </Router>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));