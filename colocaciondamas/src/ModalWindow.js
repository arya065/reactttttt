import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Row, Col, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
const VentanaModalDiccionario = (props) => {
    const { className } = props;
    const [value, setValue] = useState("CODIGO1|DESCRIPCION1");
    const handleChange = (event) => {
        // COMPLETA ESTA FUNCION
        setValue(event.target.value);
    }
    const resetHooks = () => {
        setValue("CODIGO1|DESCRIPCION1");
    }
    useEffect(() => {
        resetHooks();
    }, []);
    return (
        <div>
            <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={resetHooks}>
                <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
                <ModalBody>
                    <FormGroup row>
                        <Label sm={2} > Filtrar: </Label>
                        <Col sm={10}>
                            <Input onChange={handleChange} id="filtro" name="filtro" type="Text" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input onChange={handleChange} onClick={handleChange} id="selectMulti" name="selectMulti" type="select">
                                <option>CODIGO1|DESCRIPCION1</option>
                                <option>CODIGO2|DESCRIPCION2</option>
                                <option>CODIGO3|DESCRIPCION3</option>
                                <option>CODIGO4|DESCRIPCION4</option>
                                <option>CODIGO5|DESCRIPCION5</option>
                            </Input>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {value}<Button color="primary" onClick={() => props.add(value) && resetHooks()}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </ModalFooter>
            </Modal>
        </div>
    );
}



class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            valuesX: ["line 1", "line 2"],
            valuesY: [],
            current: 0
        }
    }
    toggleModal(current) {
        this.setState({ isOpen: !this.state.isOpen });
        this.setState({ current: current });
    }

    add(datos) {
        //aqui hacer algo con los datos
        this.toggleModal(0);
        if (this.state.current == 1) {
            let tmp = this.state.valuesX;
            this.setState({ valuesX: [...tmp, datos] });
        } else if (this.state.current == 2) {
            let tmp = this.state.valuesY;
            this.setState({ valuesY: [...tmp, datos] });
        }
    }
    getAllValues(array) {
        let str = "";
        array.forEach(e => {
            str += e + "\n";
        });
        str = str.slice(0, -1);
        return str;
    }
    render() {
        return (
            <>
                <div>
                    <UncontrolledAccordion defaultOpen={['1']} stayOpen >
                        <AccordionItem>
                            <AccordionHeader targetId="1">
                                GESTION DE FARMACOS
                            </AccordionHeader>
                            <AccordionBody accordionId="1">
                                <Row>
                                    <Col>
                                        <Alert color="info" id='uno'>
                                            Incluir X Medicamentos:
                                            <Input type="textarea" name="rxseleccionar" value={this.getAllValues(this.state.valuesX)} />
                                            <Button color="info" onClick={() => { this.toggleModal(1) }}>Add</Button>
                                            {" "}
                                            <Button color="info" onClick={""}>Clear</Button>
                                        </Alert>
                                    </Col>
                                    <Col>
                                        <Alert color="danger">
                                            Excluir Y Medicamentos:
                                            <Input type="textarea" name="rxenmascarar" value={this.getAllValues(this.state.valuesY)} />
                                            <Button color="danger" onClick={() => { this.toggleModal(2) }}>Add</Button>
                                            {" "}
                                            <Button color="danger" onClick={""}>Clear</Button>
                                        </Alert>
                                    </Col>
                                </Row>
                            </AccordionBody>
                        </AccordionItem>
                    </UncontrolledAccordion>
                </div>
                <VentanaModalDiccionario add={(datos) => this.add(datos)} mostrar={this.state.isOpen} aceptar={"Añadir"} titulo={"VENTANA MODAL"} />
                <br />
            </>
        )
    }
}

class ModalWindow extends Component {
    render() {
        return (
            <div>
                <Filter />
            </div>
        );
    }
}

export default ModalWindow;