// import modules
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// scss files
import './App.scss';

// import pages
import Home from './views/pages/Home';
import Account from './views/pages/Account';
import Mybookings from './views/pages/Mybookings';
import Sessions from './views/pages/Sessions';
import Yoga from './views/pages/Yoga';
import Personal from './views/pages/Personal';
import Group from './views/pages/Group';

import Admin from './views/pages/Admin';
import Createsession from './views/pages/Createsession';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Booking",
      version: "2.0.0",
      apiBaseHost: 'https://gym-booking-app.herokuapp.com',
      currentUserData: null,
    };
    this.updateCurrentUserData = this.updateCurrentUserData.bind(this);
    this.loginReady = React.createRef();
  }

  updateCurrentUserData(currentUserData) {
    if(currentUserData.admin === true){
      this.setState({currentUserData: currentUserData}, this.loginReady.current.goToAdmin())
    } else {
      this.setState({currentUserData: currentUserData}, this.loginReady.current.goToHome())
    }
  }

  render() {
      return (
        <BrowserRouter>
            <Routes>

              <Route path="/" element={ <Home ref={this.refreshReady} updateCurrentUserData={this.updateCurrentUserData} currentUserData={this.state.currentUserData}/> } />

              <Route path="/account" element={ <Account ref={this.loginReady} updateCurrentUserData={this.updateCurrentUserData}/> } />

              <Route path="/mybookings" element={ <Mybookings currentUserData={this.state.currentUserData}/>  } />

              <Route path="/sessions" element={ < Sessions currentUserData={this.state.currentUserData} /> } />
              
              <Route path="/yoga" element={ < Yoga currentUserData={this.state.currentUserData} /> } />

              <Route path="/personal" element={ < Personal currentUserData={this.state.currentUserData} /> } />

              <Route path="/group" element={ < Group currentUserData={this.state.currentUserData} /> } />

              <Route path="/admin" element={ < Admin currentUserData={this.state.currentUserData} />} />

              <Route path="/createsession" element={ < Createsession currentUserData={this.state.currentUserData} />} />

              <Route path="*" element={ <NoMatch /> } />

            </Routes>
        </BrowserRouter>
      )
  }
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

export default App;
