import React, { Component } from 'react';
import '../App.css';
import NotificationBoard from './NotificationBoard';
import UserBar from './UserBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserBar/>
        <NotificationBoard/>
      </div>
    );
  }
}

export default App;
