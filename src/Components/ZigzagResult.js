import React from 'react';
import InputPrompt from './Input.js';

class ItemList extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const name = this.props.item;
        return (
            name.map((text) =>
                <li>{text}</li>
            )
        );
    }
}

class ZigzagResult extends React.Component {
    constructor(props) {
        // props -> poem_array, columns
        super();
    }

    render() {
        const p_arr = this.props.poem_array;
        return (
            <div className="result-container">
                {p_arr.map((m) =>
                    <ul>
                        <ItemList item={m} />
                    </ul>
                )}

            </div>
        );
    }
}

export default ZigzagResult;