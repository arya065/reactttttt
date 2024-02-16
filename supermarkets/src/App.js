import React, { Component, useState, useEffect } from "react";
import { List, Button, Progress } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poblacion: [
        0, 5, 4, 2, 9, 8, 0, 8, 8,
        1, 7, 21, 23, 44, 5, 3, 4, 0,
        2, 6, 32, 22, 33, 8, 4, 2, 8,
        1, 2, 43, 4, 56, 65, 34, 11, 8,
        2, 22, 32, 3, 42, 62, 43, 21, 0,
        2, 2, 23, 34, 64, 24, 42, 15, 7,
        0, 2, 36, 43, 61, 26, 64, 12, 0,
        1, 2, 15, 43, 34, 2, 12, 2, 3,
        1, 0, 12, 3, 0, 0, 21, 2, 2
      ]
    };
  }
  render() {
    return (
      <div>
        {console.log(this.state.poblacion)}
      </div>
    )
  }
}

export default App;
