import React, { Component, useState } from "react";
import { List, Button } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import data from './data/data.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listQuestions: this.getListQuestions(),
      answers: [],
      puntuacion: 0
    };
  }
  getListQuestions() {
    return data.questions;
  }
  addAnswer(i, value) {
    const tmp = this.state.answers;
    tmp[i] = value;
    this.setState({ answers: tmp });
    this.setState({ puntuacion: this.state.puntuacion + value.points });
  }
  showRes() {
    if (this.state.answers.includes() || this.state.answers.length < 7) {
      return (
        <div>
          <p>PUNTUACION TOTAL....</p>
          <p>SU TIPO DE PIEL....</p>
        </div>
      )
    } else {
      return (
        <div>
          <p>PUNTUACION TOTAL - {this.state.puntuacion}</p>
          <p>SU TIPO DE PIEL{this.getTipoPiel()}</p>
        </div>
      )
    }
  }
  getTipoPiel() {
    let points = this.state.puntuacion;
    if (points <= 7) {
      return "TIPO DE PIEL I. Muy sensible a la luz solar";
    } else if (points <= 21) {
      return "TIPO DE PIEL II. Sensible a la luz solar";
    } else if (points <= 42) {
      return "TIPO DE PIEL III. Sensibilidad normal a la luz solar";
    } else if (points <= 68) {
      return "TIPO DE PIEL IV. La piel tiene tolerancia a la luz solar";
    } else if (points <= 84) {
      return "TIPO DE PIEL V. La piel es oscura. Alta tolerancia";
    } else {
      return "TIPO DE PIEL VI. La piel es negra. Altísima tolerancia NIGNIGNIGNIGNIG";
    }
  }
  getColor(el) {
    if (this.state.answers.includes(el)) {
      return "success";
    } else {
      return "secondary";
    }
  }
  render() {
    return (
      <div>
        <List className="list-questions">
          {
            this.state.listQuestions.map((e, i) => (
              <>
                <li>{e.question.text}</li>
                <List>
                  {
                    e.question.answers.map(el => (
                      <li>
                        <Button color={this.getColor(el)} onClick={() => this.addAnswer(i, el)}>
                          {el.points}-{el.answer}
                        </Button>
                      </li>
                    ))
                  }
                </List>
              </>
            ))
          }
        </List>
        {this.showRes()}
      </div>
    );
  }
}

export default App;
