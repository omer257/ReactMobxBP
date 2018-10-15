import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  super(props){
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    //Testing api works
    let data = axios('/foodApi')
    .then(data => this.setState({ data:data.data }));
  }

  render() {
    let data = this.state;
    console.log(dat)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
           Create-react-app with decorators and mobx support.<br />
           Have fun!
          </p>
         
        </header>
      </div>
    );
  }
}

export default App;
