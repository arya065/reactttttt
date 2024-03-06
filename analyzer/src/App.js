import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import db from './db.json';

function Result(props) {
  const calc = () => {
    console.log(props.cnstAno);
    let ano = props.cnstAno * (2024 - props.result[0].slice(0, 4));
    let banos = props.cnstBanos * props.result[1];
    let estado = props.cnstEstado * props.result[2];
    let habitaciones = props.cnstHab * props.result[3];
    let metros = props.cnstMetros * props.result[4];

    let medium = (ano + banos + estado + habitaciones + metros) / 5;
    console.log(Math.floor(medium));
    return Math.floor(medium);
  }

  return (
    <>
      <h3>Resultado:</h3>
      <ul>
        {props.result.map((e, i) => (
          <li>{e}</li>
        ))}
      </ul>
      <p>
        Precio medio: {calc()}
      </p>
    </>
  )
}

function App() {
  const [res, setRes] = useState([]);
  const [ano, setAno] = useState(0);
  const [banos, setBanos] = useState(0);
  const [estado, setEstado] = useState(0);
  const [hab, setHab] = useState(0);
  const [metros, setMetros] = useState(0);

  useEffect(() => {
    const PRECIOS = [415000, 1850000, 335000, 675000, 370000, 680000, 299000, 2599000, 520000, 1980000, 147000, 219900, 136000, 138000, 400000, 244000, 335000, 735000, 180000, 380000, 260000, 700000, 299200, 149000, 370000, 320000, 950000, 380000, 367000, 430000, 293000, 545000, 641000, 477225, 95000, 1395000, 158000, 165000, 296900, 1990000, 222500, 448000, 680000, 2250000, 369000, 375000, 429000, 1690000, 159000, 222500, 850000, 2750000, 400000, 780000, 400000, 370000, 680000, 735000, 335000, 299000, 1375000]
    let tmp = [];
    let cnstAno = 0;
    let cnstBanos = 0;
    let cnstEstado = 0;
    let cnstHab = 0;
    let cnstMetros = 0;
    db.map((e, i) => {
      e.precio = PRECIOS[i];
      tmp.push(e)
    })

    tmp.map((e, i) => {
      cnstAno += parseInt(e.ano);
      cnstBanos += parseInt(e.precio / e.banos);
      cnstEstado += parseInt(e.precio / e.estado);
      cnstHab += parseInt(e.precio / e.habitaciones);
      cnstMetros += parseInt(e.precio / e.metros);
    })
    setAno(cnstAno / tmp.length);
    setBanos(cnstBanos / tmp.length);
    setEstado(cnstEstado / tmp.length);
    setHab(cnstHab / tmp.length);
    setMetros(cnstMetros / tmp.length);
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    let tmp = [];
    for (let i = 0; i < event.target.length - 1; i++) {
      tmp.push(event.target[i].value);
    }
    setRes(tmp);
  }

  const show = () => {
    if (res.length == 9) {
      let err = false;
      res.map((e, i) => {
        if (e == "" || e == undefined) {
          err = true;
        }
      })
      if (!err) {
        return (
          <Result result={res} cnstAno={ano} cnstBanos={banos} cnstEstado={estado} cnstHab={hab} cnstMetros={metros} />
        )
      }
    }
  }

  return (
    <div>
      <h1>Formulario:</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <p>
            <Label for="year">Año:</Label>
            <Input id="year" name="year" type="date" />
          </p>
        </FormGroup>
        <FormGroup>

          <p>
            <Label for="bano">Baños:</Label>
            <Input id="bano" name="bano" type="text" />
          </p>
        </FormGroup>
        <FormGroup>
          <p>
            <Label for="estado">Estado:</Label>
            <Input id="estado" name="estado" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </p>
        </FormGroup>
        <FormGroup>
          <p>
            <Label for="room">Habitaciones:</Label>
            <Input id="room" name="room" type="text" />
          </p>
        </FormGroup>
        <FormGroup>
          <p>
            <Label for="meter">Metros:</Label>
            <Input id="meter" name="meter" type="text" />
          </p>
        </FormGroup>
        <FormGroup>
          <p>
            <Label for="vista">Vista mar:</Label>
            <Input id="vista" name="vista" type="select">
              <option value={0} >No</option>
              <option value={1}>Si</option>
            </Input>
          </p>
        </FormGroup>
        <FormGroup>
          <p>
            <Label for="garaje">Garaje:</Label>
            <Input id="garaje" name="garaje" type="select">
              <option value={0}>No</option>
              <option value={1}>Si</option>
            </Input>
          </p>
        </FormGroup>
        <FormGroup>
          <p>
            <Label for="trastero">Trastero:</Label>
            <Input id="trastero" name="trastero" type="select">
              <option value={0}>No</option>
              <option value={1}>Si</option>
            </Input>
          </p>
        </FormGroup>
        <FormGroup>
          <p>
            <Label for="pool">Piscina:</Label>
            <Input id="pool" name="pool" type="select">
              <option value={0}>No</option>
              <option value={1}>Si</option>
            </Input>
          </p>
        </FormGroup>

        <Button type='submit'>Submit</Button>
      </Form>
      {show()}
    </div>
  );
}

export default App;
