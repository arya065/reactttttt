import React, { Component, useState, useEffect } from "react";
import { List, Button, Progress } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import data from './data/data.json';
import './App.css';
import axios from 'axios';

function ShowAnswers(props) {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (props.status) {
        await apiPost();
        props.handleClick();
      }
    }
    fetchData();
  }, [props.status]);
  const apiPost = async () => {
    axios
      .post("http://localhost/Proyectos/API/apiTestfototipos/add/" + props.points + "/100",
        {},//здесь должны быть данные, но они у меня в ссылке
        {
          withCredentials: true, // отправлять куки 
          headers: {
            'Content-Type': 'application/json',
          },
        })
      .then((response) => {
        console.log("post response:", response.data);
        if (response.data.message) {
          apiGet();
        } else {
          setAnswers(response.data);
          // props.getParts(response.data);
        }
      })
      .catch((error) => {
        console.log("ERRORRRRRRR", error);
      });
  };
  const apiGet = async () => {
    axios
      .get("http://localhost/Proyectos/API/apiTestfototipos/take/all", {
        withCredentials: true, // отправлять куки 
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setAnswers(response.data);
        console.log("get response:", response.data);
        // props.getParts(response.data);
      })
      .catch((error) => {
        console.log("ERRORRRRRRR", error);
      });
  };
  const ProgressBar = () => {
    if (answers.length > 0) {
      return (
        <p>
          <Progress style={{ width: "90%", margin: "auto" }} multi>
            {props.getParts(answers).map((e, i) => (
              // <>{console.log(e[0] + ":" + e[1])}</>
              <Progress bar value={e[0] / answers.length * 100} style={{ background: e[1] }}>
                Cantidad:{e[0]}
              </Progress>
            ))}
          </Progress>
        </p>
      )
    }
  }
  return (
    <div>
      {/* https://reactstrap.github.io/?path=/docs/components-progress--progress */}
      {ProgressBar()}
      <ul>
        {answers.map((e, i) => (
          <li key={i}>
            <span>ID:{e.result.id}</span>;
            <span>Puntos:{e.result.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listQuestions: this.getListQuestions(),
      answers: [],
      puntuacion: 0,
      lookAll: false,
      allAnswers: [],
    };
  }
  getListQuestions() {
    return data.questions;
  }
  addAnswer(i, value) {
    const tmp = this.state.answers;
    let prev = 0;
    if (tmp[i] != undefined) {
      prev = tmp[i].points;
    }
    tmp[i] = value;
    this.setState({ answers: tmp });
    this.setState({ puntuacion: this.state.puntuacion + value.points - prev });
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
          <img src={this.getPhoto()} />
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
  getPhoto() {
    let points = this.state.puntuacion;
    if (points <= 7) {
      return "./images/img/tipo1.png";
    } else if (points <= 21) {
      return "./images/img/tipo2.png";
    } else if (points <= 42) {
      return "./images/img/tipo3.png";
    } else if (points <= 68) {
      return "./images/img/tipo4.png";
    } else if (points <= 84) {
      return "./images/img/tipo5.png";
    } else {
      return "./images/img/tipo6.png";
    }
  }

  handleClick() {
    if (this.state.answers.includes() || this.state.answers.length < 7) {
      console.log("You need to finish form first");
    } else {
      this.setState({ lookAll: !this.state.lookAll });
    }
  }
  getColor(el) {
    if (this.state.answers.includes(el)) {
      return "success";
    } else {
      return "secondary";
    }
  }
  getParts(answers) {
    if (answers.length != 0) {
      // let res = Array.from({ length: 6 }, () => Array.from({ length: 2 }), () => 1);
      let res = JSON.parse(JSON.stringify(Array(6).fill(Array(2).fill(0))));
      // console.log("ini", res);
      // console.log("here", answers);
      res[0][1] = "#0213f7";
      res[1][1] = "#0bf702";
      res[2][1] = "#f7021b";
      res[3][1] = "#f79102";
      res[4][1] = "#f702f3";
      res[5][1] = "#02eff7";
      answers.map((e) => {
        if (e.result.points <= 7) {
          res[0][0]++;
        } else if (e.result.points <= 21) {
          res[1][0] += 1;
        } else if (e.result.points <= 42) {
          res[2][0] += 1;
        } else if (e.result.points <= 68) {
          res[3][0] += 1;
        } else if (e.result.points <= 84) {
          res[4][0] += 1;
        } else {
          res[5][0] += 1;
        }
      });
      console.log("analysis:", res);
      return res;
    }
    return [[0], ["Tipo 0"]];
  }
  getMessage() {
    if (this.state.answers.includes() || this.state.answers.length < 7) {
      return "Tienes que terminar formulario";
    }
    return "Enviar y mirar todos resultados";
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

        <Button onClick={() => this.handleClick()}>{this.getMessage()}</Button>
        <ShowAnswers status={this.state.lookAll} handleClick={() => this.handleClick()} points={this.state.puntuacion} getParts={(answers) => this.getParts(answers)}></ShowAnswers>
      </div>
    );
  }
}

export default App;
