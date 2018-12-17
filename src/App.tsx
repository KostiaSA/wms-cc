
import logo from './logo.svg';
import './App.css';
import {Component} from "react";
import React from 'react';
import Button from "reactstrap/lib/Button";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn uuuReact53300
          </a>
          <Button>
            уроды1
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
