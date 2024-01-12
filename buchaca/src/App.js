import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// i didnt understand how to use this function, then i made how i know to do
// you need to add this to the index.css stylesheet:
/*
button {
  border: 1px solid black;
  height: 20px;
  width: 20px;
}

.blue {
  background-color: blue;
}
*/
const MapaBotones = (props) => {
  // este componente pinta el tablero 9x9 con las props que le paso.
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: this.createMatrix(),
      // no se puede modificar el state
    }
  }
  createMatrix() {
    let arr = [];
    for (let i = 0; i < 9; i++) {
      arr[i] = [];
      for (let j = 0; j < 9; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }
  clica(x, y) {
    // x se supone que la columna, y la fila
    if (x == 0) {
      let arr = this.state.listaBotones;
      let tmp = x;
      while (1) {
        if (arr[tmp][y] == 1) {
          tmp -= 1;
          break;
        } else if (tmp == 8) {
          break;
        } else {
          tmp += 1;
        }
      }
      arr[tmp][y] = 1;
      this.setState({ listaBotones: arr });
    }
  }
  componentWillMount() {
    // aquí es donde creo las nueve columnas con los datos iniciales.
  }
  print(el) {
    if (el == 1) {
      return "blue";
    }
  }
  render() {
    return (
      <div>
        <h1> BUCHACA </h1>
        <table>
          <tbody>
            {
              this.state.listaBotones.map((e, row) => (

                <tr key={row}>
                  {
                    e.map((el, col) => (
                      <td key={col}>
                        <button className={this.print(el)} onClick={() => this.clica(row, col)}>&nbsp;</button>
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

