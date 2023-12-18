import './App.css';
import React from 'react';
class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.onAddDeseo}>
                    <input type='text' name='nombre' placeholder='Introduce regalo' />
                </form>
            </div>
        )
    }
}
export default Form;