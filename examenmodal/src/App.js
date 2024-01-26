import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert, Row, Col, UncontrolledAccordion, AccordionItem,
  AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader,
  ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';
import { FARMACOS } from './componentes/datos';
//i deleted first line from datos.js
const VentanaModalDiccionario = (props) => {
  const { className } = props;
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");
  const [listado, setValueListado] = useState(FARMACOS);
  const handleChange = (event) => {
    // console.log("list:", listado, "\n hook: ", value);
    if (event.target.value != "" && event.target.value != "SELECCIONE UN FARMACO") {
      setValueListado(FARMACOS.filter((el) => {
        if (findInStr(el.descATC, event.target.value.toUpperCase())) {
          return el;
        }
      }));
      setValue(getName(event.target.value.toUpperCase()));
      setCode(getCode(event.target.value.toUpperCase()));
    } else {
      setValueListado(FARMACOS);
    }
    // COMPLETA ESTA FUNCION
  }
  const getName = (str) => {
    return str.slice(str.indexOf("|") + 1);
  }
  const getCode = (str) => {
    return str.slice(0, str.indexOf("|"));
  }
  const findInStr = (str, find) => {
    for (let i = 0; i <= str.length; i++) {
      let tmp = str.slice(0, i);
      if (tmp == find) {
        return true;
      }
    }
    return false;
  }
  const getOptions = () => {

  }
  const resetHooks = (value, list) => {
    if (value != undefined && value != "") {
      props.add(value, list);
      props.toggle();
      setValue("");
    }
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle}
        className={className} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={2} > Filtrar: </Label>
            <Col sm={10}>
              <Input onChange={handleChange} id="filtro" name="filtro" type="Text" value={value} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input onChange={handleChange} onClick={handleChange} id="selectMulti" name="selectMulti" type="select">
                <option hidden unselectable='on'>SELECCIONE UN FARMACO</option>
                {
                  listado.map((e) => (
                    <option>{e.codATC}|{e.descATC}</option>
                  ))
                }
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {value}<Button color="primary" onClick={() => { resetHooks(code, props.current) }}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div >
  );
}
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      rxseleccionar: ["item1"],
      rxenmascarar: ["item2"],
      diccionario: "FÁRMACO",
      current: 0
    }
  }

  handleChange = (event) => {
  }
  add(datos, list) {
    this.toggleModal();
    this.addToList(datos, list);
  }
  setIsOpen(d) {
    if (d == undefined) return;
    this.setState({ isOpen: d })
  }
  toggleModal(current) {
    if (this.state.isOpen) {
      this.setState({ current: 0 });
    } else {
      this.setState({ current: current });
    }
    this.setIsOpen(!this.state.isOpen);
  }
  addToList(value, list) {
    if (list == 1) {
      this.setState({ rxseleccionar: [...this.state.rxseleccionar, value] });
    } else if (list == 2) {
      this.setState({ rxenmascarar: [...this.state.rxenmascarar, value] });
    }
  }
  clearField(current) {//1 is blue one, 2 is red one
    if (current == 1) {
      this.setState({ rxseleccionar: [] });
    } else {
      this.setState({ rxenmascarar: [] });
    }
  }
  render() {
    return (
      <>
        <div>
          <UncontrolledAccordion defaultOpen={['1']} stayOpen>
            <AccordionItem>
              <AccordionHeader targetId="1">GESTION DE FARMACOS</AccordionHeader>
              <AccordionBody accordionId="1">
                <Row>
                  <Col>
                    <Alert color="info">
                      Incluir X Medicamentos:
                      <Input type="textarea" name="rxseleccionar" onChange={this.handleChange.bind(this)} value={this.state.rxseleccionar} />
                      <Button onClick={() => { this.toggleModal(1) }} color="info">Add</Button>
                      {" "}
                      <Button color="info" onClick={() => this.clearField(1)}>Clear</Button>
                    </Alert>
                  </Col>
                  <Col>
                    <Alert color="danger">
                      Excluir X Medicamentos:
                      <Input type="textarea" name="rxenmascarar" onChange={this.handleChange.bind(this)} value={this.state.rxenmascarar} />
                      <Button onClick={() => { this.toggleModal(2) }} color="danger">Add</Button>
                      {" "}
                      <Button color="danger" onClick={() => this.clearField(2)}>Clear</Button>
                    </Alert>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
        <VentanaModalDiccionario diccionario={this.state.diccionario} add={(datos, list) => this.add(datos, list)} mostrar={this.state.isOpen} aceptar={"Añadir"} toggle={() => this.toggleModal()} titulo={"Add" + this.state.diccionario} current={this.state.current} />
        <br />
      </>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Filter />
      </div>
    );
  }
}
export default App;