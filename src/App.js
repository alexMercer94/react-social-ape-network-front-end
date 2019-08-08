import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

const theme = createMuiTheme(themeFile);
// Get token from Localstorage
const token = localStorage.FBIdToken;
let authenticated;

// Verify if the token has expired
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login';
        authenticated = false;
    } else {
        authenticated = true;
    }
}

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <AuthRoute exact path="/login" component={Login} authenticated={authenticated} />
                                <AuthRoute exact path="/signup" component={Signup} authenticated={authenticated} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
