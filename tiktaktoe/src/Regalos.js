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
        // this.setValueDeseos = this.setValueDeseos.bind(this);
    }
    // handleAniadirDeseo(event) {
    //     event.preventDefault();
    //     var aux = [];
    //     if (this.state.deseos && this.state.deseos !==
    //         "null" && this.state.deseos !== "undefined") {
    //         aux = this.state.deseos.slice();
    //     }
    //     aux.push(event.target.deseo.value);
    //     this.setState({
    //         deseos: aux
    //     });
    // }
    // componentDidUpdate() {
    //     console.log(this.state.deseos);
    // }
    changeValueDeseos(evt) {
        evt.preventDefault();
        // console.log(evt);
        const newValues = this.state.deseos;
        Array.from(evt.target.childNodes).map((e) => { newValues.push(e.value) });
        // console.log(newValues);
        this.setState({ deseos: newValues });
    }
    render() {
        console.log(this.state.deseos);
        return (
            <div id='test'>
                <h1>Lista de deseos</h1>
                <h2>Anade tu regalo favorito</h2>
                <History deseos={this.state.deseos} />
                <Form change={this.changeValueDeseos.bind(this)} />
                {/* <Form onAddDeseo={this.handleAniadirDeseo.bind(this)} /> */}
            </div>
        )
    }
}
export default Regalos;