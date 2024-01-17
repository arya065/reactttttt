import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.defaultList(),
      result: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);//когда надо ставить а когда нет
  }
  defaultList() {
    let arr = [];
    arr.push("Estepona", "Estepa", "Esqqqqq", "Eswwwww", "esqqqqq", "seee", "Sewqqqq");
    return arr;
  }
  handleSubmit(e) {
    e.preventDefault();
    let value = e.target[0].value;
    console.log(value);
    // this.setState({ result: value });
    this.search(value.toUpperCase());
  }
  search(value) {
    let result = [];
    let list = this.state.list;
    let len = value.length;
    list.forEach((e, i) => {
      let tmp = e.slice(0, len);
      if (tmp.toUpperCase() == value) {
        result.push(e);
      }
    });
    console.log(result);
    this.setState({ result: result });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='Busqueda' />
          <button>Buscar</button>
        </form>
        <p>Resultado busqueda:</p>
        <ul>
          {
            this.state.result.map((e) => (
              <li>{e}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
