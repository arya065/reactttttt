import React, { Component } from "react";
import { Button, Card, CardImg, CardBody, CardTitle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Sino = (props) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <CardImg src={props.imagen} />
        <CardBody>
          <CardTitle tag="h5">{props.Titulo}</CardTitle>
          <Button onClick={() => props.onClick(props.imagenSi)}>
            {props.textobotonSI}
          </Button>
          <Button onClick={() => props.onClick(props.imagenNo)}>
            {props.textobotonNO}
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagen: "/assets/images/yes.png",
    };
  }

  f(param) {
    this.setState({ imagen: param });
  }

  render() {
    return (
      <div className="App">
        <Sino
          imagen={this.state.imagen}
          imagenSi="/assets/images/yes.png"
          imagenNo="/assets/images/no.png"
          Titulo="Yes or Not"
          textobotonSI="Oh yes!"
          textobotonNO="Oh no!"
          onClick={(x) => this.f(x)}
        />
      </div>
    );
  }
}

export default App;
