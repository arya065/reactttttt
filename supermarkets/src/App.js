import React, { Component, useState, useEffect } from "react";
import { List, Button, Progress, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
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
      ],
      popOpen: false,
    };
  }
  mixColorsRGB(color1, color2) {
    // let red = 0, green = 0, blue = 0;
    let red = color1[0] + color2[0];
    let green = color1[1] + color2[1];
    let blue = color1[2] + color2[2];
    return ("rgb(" + Math.round(red / 2) + "," + Math.round(green / 2) + "," + Math.round(blue / 2) + ")");
  }
  handleClick() {
    this.setState({ popOpen: !this.state.popover });
  }
  render() {
    // console.log(this.mixColorsRGB([255, 255, 255], [58, 89, 89]));
    return (
      <div>
        {this.state.poblacion.map((e, i) => {
          if ((i) % 9 == 0) {
            return (<br />)
          }
          return (
            <>
              <Button id={"h"} type="button" style={{ width: "60px", margin: "3px", background: this.mixColorsRGB([0, 255, 0], [200, 0, 255]) }}>
                {e}
              </Button>
              <Popover flip target={"h"} trigger="click">
                <PopoverHeader>Quieres poner mercado aqui?</PopoverHeader>
                <PopoverBody>si</PopoverBody>
              </Popover>
            </>
          )
        })}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Button id={"Testid"} type="button" style={{ width: "60px", margin: "3px", background: this.mixColorsRGB([0, 255, 0], [200, 0, 255]) }} onClick={() => this.handleClick()}>
          test
        </Button>
        <Popover isOpen={this.state.popOpen} flip target={"Testid"} trigger="focus">
          <PopoverHeader>Quieres poner mercado aqui?</PopoverHeader>
          <PopoverBody>si</PopoverBody>
        </Popover>
      </div>
    )
  }
}

export default App;
