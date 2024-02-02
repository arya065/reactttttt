import React, { Component, useState } from "react";
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const VentanaModalDiccionario = (props) => {
  const [nombre, setNombre] = useState("");
  const [tel, setTel] = useState("");
  const { className } = props;
  const handleChange = (evt, param) => {
    if (param == "nombre") {
      setNombre(evt.target.value);
    } else if (param == "tel") {
      setTel(evt.target.value);
    }
  }
  const handleClose = () => {
    setNombre("");
    setTel("");
  };
  const handleClick = () => {
    props.toggle();
    if (nombre != "" && tel != "") {
      props.handleAdd(props.lista, [nombre + "-", tel]);
    }
    handleClose();
  }
  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={() => { }}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>

          <FormGroup row >
            <Label sm={2} > Nombre: </Label>
            <Col sm={10}>
              <Input
                id="nombre"
                name="nombre"
                type="Text"
                onChange={(evt) => handleChange(evt, "nombre")}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} > Teléfono: </Label>
            <Col sm={10}>
              <Input
                id="telefono"
                name="telefono"
                type="Text"
                onChange={(evt) => handleChange(evt, "tel")}
              />
            </Col>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleClick()}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div>

  );
}

const Mostrar = (props) => {
  return (
    <ul>
      {
        props.list.map((e, i) => (
          <li>
            <span>{e}</span>
            <Button onClick={() => props.handleDel(props.list, i)}>Borrar</Button>
          </li>
        ))
      }
    </ul>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
      listaUsuarios: [["name1 -", "tel1"], ["name2 -", "tel2"], ["name3 -", "tel3"],],
      isOpen: false,

    };
  }

  setIsOpen(d) {
    if (d == undefined) return;
    this.setState({ isOpen: d })
  }

  toggleModal() { this.setIsOpen(!this.state.isOpen); }

  handleDel(lista, i) {
    let list = lista.filter((e, index) => index != i);
    this.setState({ listaUsuarios: list });
  }

  handleAdd(lista, el) {
    let rep = lista.filter((e) => { if (e[1] == el[1]) { return true; } });
    if (rep.length == 0) {
      this.setState({ listaUsuarios: [...lista, el] });
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Listin teléfonico</h1>
        <Mostrar list={this.state.listaUsuarios} handleDel={(list, i) => { this.handleDel(list, i) }} />
        <Button onClick={() => { this.toggleModal() }} color="info">Add</Button>
        <VentanaModalDiccionario
          mostrar={this.state.isOpen}
          aceptar={"Añadir"}
          toggle={() => this.toggleModal()}
          titulo={"Alta en el listín"}
          lista={this.state.listaUsuarios}
          handleAdd={(lista, el) => { this.handleAdd(lista, el) }}
        />
      </div>
    );
  }
}
export default App;