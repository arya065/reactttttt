import './App.css';
import React from 'react';
import History from './History';
import Form from './Form';
class Regalos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deseos: ["gambas", "jamon"]
        }
    }
    render() {
        return (
            <div id='test'>
                <h1>Lista de deseos</h1>
                <h2>Anade tu regalo favorito</h2>
                <History deseos={this.state.deseos} />
                <Form />
            </div>
        )
    }
}
export default Regalos;