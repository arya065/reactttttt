import React, { Component, useState, useEffect } from "react";
import { Button, Input, FormGroup, Label, Col, Table, ButtonGroup } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


const Saldo = (props) => {
    //GESTIÓN DE SALDO (SUMAR Y GASTAR)
    const [value, setValue] = useState(0);
    const [tel, setTel] = useState();

    const handleChange = (event) => {
        let attr = event.target.attributes.name.nodeValue;
        let res = event.target.value;
        if (attr == "telefono") {
            if (parseInt(res)) {
                setTel(res);
            }
        } else if (attr == "saldo") {
            if (parseInt(res) > 0) {
                setValue(res);
            }
        }
    }

    return (
        <div>
            <h3>{props.titulo}</h3>
            <FormGroup row>
                <Label sm={1} > Teléfono: </Label>
                <Col sm={2}>
                    <Input
                        id="telefono"
                        name="telefono"
                        type="Text" onChange={handleChange} />
                </Col>
                <Label sm={1} > Saldo: </Label>
                <Col sm={2}>
                    <Input
                        id="saldo"
                        name="saldo"
                        type="Number" onChange={handleChange} />
                </Col>
            </FormGroup>


            <Button color="primary" onClick={() => props.change(tel, value)}>ACTUALIZAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>


    );
}


const Altas = (props) => {
    // ALTAS DE USUARIOS
    const [value, setValue] = useState([]);

    const handleChange = (event) => {
        let attr = event.target.attributes.name.nodeValue;
        let res = event.target.value;
        let tmp = value;
        console.log(attr);
        if (attr == "nombre") {
            tmp[1] = res;
        } else if (attr == "telefono") {
            if (parseInt(res)) {
                tmp[0] = res;
                console.log(res);
            }
        } else if (attr == "saldo") {
            if (parseInt(res) > 0) {
                tmp[2] = res;
            }
        }
        setValue(tmp);
    }
    const send = () => {
        props.add(value);
        setValue([]);
    }

    return (
        <div>
            <h3>Alta de usuario</h3>
            <FormGroup row>
                <Label sm={1} > Nombre: </Label>
                <Col sm={3}>
                    <Input
                        id="nombre"
                        name="nombre"
                        type="Text" onChange={handleChange} />
                </Col>
                <Label sm={1} > Teléfono: </Label>
                <Col sm={2}>
                    <Input
                        id="telefono"
                        name="telefono"
                        type="Text" onChange={handleChange} />
                </Col>
                <Label sm={1} > Saldo: </Label>
                <Col sm={2}>
                    <Input
                        id="saldo"
                        name="saldo"
                        type="Number" onChange={handleChange} />
                </Col>
            </FormGroup>
            <Button color="primary" onClick={() => send()}>ALTA</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>


    );
}


const Mostrar = (props) => {
    // ESTE COMPONENTE MUESTRA LA TABLA
    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th></th>
                        <th>Teléfono</th>
                        <th>Nombre</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Boton</td>
                        <td>telefono</td>
                        <td>nombre</td>
                        <td>saldo</td>
                    </tr>
                    {props.datos.map((e, i) => (
                        <tr key={i}>
                            <td>
                                <Button onClick={() => props.borrar(e[0])}>Borrar</Button>
                            </td>
                            {e.map((el, index) => (
                                <td key={index}>{el}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>


        </>
    );
};






class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
            listaUsuarios: [["111", "name", 10]],
            opcion: 0,
        };
    }
    removeZero () {
        let tmp = this.state.listaUsuarios;
        tmp.map((e, i) => {
            if (e[2] <= 0) {
                tmp.splice(i, 1);
            }
        });
        this.setState({ listaUsuarios: tmp });
    }
    addToList (value) {
        let err = (value.length != 3) || this.checkRepeat(value[0]);
        if (!err) {
            console.log("here");
            value.map((e) => {
                if (e == "" || e == undefined || e == null || e == 0) {
                    err = true;
                }
            });
            if (!err) {
                this.setState({ listaUsuarios: [...this.state.listaUsuarios, value] });
            }
        }
    }
    checkRepeat (value) {
        let tmp = false;
        this.state.listaUsuarios.map((e) => {
            if (e[0] == value) {
                tmp = true;
            }
        });
        return tmp;
    }
    sum (tel, value) {
        this.state.listaUsuarios.map((e, i) => { if (e[0] == tel) { e[2] = parseInt(e[2]) + parseInt(value) } });
        this.forceUpdate();
        this.removeZero();
    }
    mice (tel, value) {
        this.state.listaUsuarios.map((e, i) => { if (e[0] == tel) { e[2] = parseInt(e[2]) - parseInt(value) } });
        this.forceUpdate();
        this.removeZero();
    }
    setOption (value) {
        this.setState({ opcion: value });
    }
    showComp () {
        if (this.state.opcion == 1) {
            return (
                <Altas add={(v) => this.addToList(v)}></Altas>
            )
        } else if (this.state.opcion == 2) {
            return (
                <Saldo titulo={"Añadir saldo"} change={(tel, value) => this.sum(tel, value)}></Saldo>
            )
        } else if (this.state.opcion == 3) {
            return (
                <Saldo titulo={"Gastar saldo"} change={(tel, value) => this.mice(tel, value)}></Saldo>
            )
        }
    }
    borrar (t) {
        console.log("here");
        let tmp = this.state.listaUsuarios;
        tmp.map((e, i) => {
            if (e[0] == t) {
                tmp.splice(i, 1);
            }
        });
        this.setState({ listaUsuarios: tmp });
    }
    render () {
        console.log("lista:", this.state.listaUsuarios);
        return (
            <div className="App">
                <h1>GESTION USUARIOS</h1>
                <Mostrar datos={this.state.listaUsuarios} borrar={(t) => this.borrar(t)} />
                <ButtonGroup>
                    <Button color="info" onClick={() => this.setOption(1)}>
                        Alta usuario
                    </Button>
                    <Button color="success" onClick={() => this.setOption(2)}>
                        Sumar saldo
                    </Button>
                    <Button color="danger" onClick={() => this.setOption(3)}>
                        Gastar saldo
                    </Button>
                </ButtonGroup>
                {this.showComp()}
            </div >
        );
    }
}
export default App;