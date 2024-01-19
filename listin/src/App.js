import './App.css';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Altas = (props) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  //doesnt work
  // const [list, setList] = useState("");
  function handleClick(e) {
    if (!checkRepeat(e)) {
      let list = props.list;
      props.addToList(e.target.form[0].value, e.target.form[1].value, e.target.form[2].value, list);
      console.log(list);
    }
  }
  function checkRepeat(value) {
    let list = props.list;
    list.forEach(e => {
      e = e.split(";");
      if (e.find(value)) {
        return true;
      }
    });
    return false;
  }
  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="nombre">Nombre:</Label>
          <Input name="nombre" id="nombre" placeholder="introduzca nombre" />

          <Label for="apellidos">Apellidos:</Label>
          <Input name="apellidos" id="apellidos" placeholder="introduzca apellidos" />

          <Label for="telefono">Telefono:</Label>
          <Input name="telefono" id="telefono" placeholder="introduzca telefono" />
        </FormGroup>
        <Button onClick={handleClick}>Añadir</Button>
      </Form>
    </div>
  );


}

const Mostrar = (props) => {
  // ESTE COMPONENTE MUESTRA EL LISTÍN TELEFÓNICO.
  return (
    <ul>
      {
        props.list.map((e) => (
          <li>{e} <Button onClick={props.removeFromList(e, props.list)}>X</Button></li>
        ))
      }
    </ul>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ["test;test;111", "test2;test2;222"]
    };
  }
  addToList(v1, v2, v3, list) {
    list.push(v1 + ";" + v2 + ";" + v3);
    return list;
  }
  removeFromList(value, list) {
    let index = list.indexOf(value)
    if (index != -1) {
      list[index] = '';
    }
    return list;
  }

  componentDidUpdate() {
    console.log("this.state.list", this.state.list);
  }
  render() {
    return (
      <div>
        <Mostrar list={this.state.list} removeFromList={this.removeFromList} />
        <Altas list={this.state.list} addToList={this.addToList} />
        {/* update this.state doesnt work*/}
      </div >
    );
  }
}


export default App;



















