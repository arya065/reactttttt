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
      isOpen: false,
    };
  }
  getListQuestions() {
    console.log(data.questions.map(e => console.log(e)));
    return data.questions;
  }
  addAnswer(i, value) {
    let tmp = this.state.answers;
    tmp[i] = value;
    this.setState({ answers: tmp })
  }
  render() {
    return (
      <List className="list-questions">
        {
          this.state.listQuestions.map(e => (
            <>
              <li>{e.question.text}</li>
              <List>
                {
                  e.question.answers.map(el => (
                    <li>
                      <Button color="secondary">
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
    );
  }
}

export default App;
