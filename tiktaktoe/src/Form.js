import './App.css';
import React from 'react';
class Form extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.props.change}>
                    <input type='text' name='nombre' placeholder='Introduce regalo' />
                    {/* <input type='text' name='other' placeholder='Introduce regalo' /> */}
                    {/* <input type='submit' /> */}
                </form>
            </div>
        )
    }
}
export default Form;