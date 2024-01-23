import './App.css';
import { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
/*
meter en index.css
button {
  border: 1px solid black;
  height: 40px;
  width: 40px;
}
*/
function Botonera(props) {
  //COMPONENTE QUE RENDERIZA EL TABLERO
  if (props.el == 1) {
    return (
      <Button color="success" />
    )
  } else if (props.el == -1) {
    return (
      <Button outline />
    )
  } else {
    return (
      <Button color="secondary" />
    )
  }
}
class App extends Component {
  constructor(props) {

    super(props);
    this.state = {
      list: this.createMatrix(4, 8)
      //DEFINE EL ESTADO DE TU COMPONENTE PRINCIPAL
      //Recuerda que si defines una tabla 8x8 tu estado será inválido.
    };
  }
  createMatrix(x, y) {
    let list = Array.from({ length: y }, (e, i) => {
      return Array.from({ length: x }, () => { if (i > 4) { return 1; } return 0 })
    });
    return list;
  }

  componentWillMount() {
    //ESTE MÉTODO SE EJECUTARÁ AL PRINCIPIO DE LA APLICACIÓN. ANTES DE RENDERIZAR.
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.list.map((e, i) => (
              <tr>
                {
                  e.map((el) => {
                    if (i % 2 == 1) {
                      return (
                        <>
                          <td><Botonera el={-1} /></td>
                          <td><Botonera el={el} /></td>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <td><Botonera el={el} /></td>
                          <td><Botonera el={-1} /></td>
                        </>
                      )
                    }
                  })
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    );
  }
}
export default App;