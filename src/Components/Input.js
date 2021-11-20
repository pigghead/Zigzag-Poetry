import { render } from '@testing-library/react';
import React from 'react';
import ZigzagResult from './ZigzagResult.js';

class InputPrompt extends React.Component {
    constructor(props) {
        super();
        // must track the number of columns
        // and the poem itself
        this.state = {
            numColumns: 1,
            poemInput: '',
            poemArr: [,],
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.alterPoemInput = this.alterPoemInput.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault(); // prevent refresh
        const name = e.target.name;
        //this.alterPoemInput(this.state.poemInput, this.state.numColumns);

        this.setState({numColumns: e.target.elements.numColumns.value,
                       poemInput: e.target.elements.poemInput.value});

        this.alterPoemInput(this.state.poemInput, this.state.numColumns);
    }

    alterPoemInput(N, M) {
        // N words % M columns = r remainder, M - r = p num periods needed
        if(M > 10) {M = 10;}
        if(M < 1) {M=1;}
        var poem_array = N.split(/\s/g); // split by any and all white space characters (space + newline)
        var poem_array_2d = [];

        // pad with periods wbefore converting to 2d array
        var periodsNeeded = 0;
        while((poem_array.length + periodsNeeded) % M != 0) {
            periodsNeeded += 1;
        }

        for(let i = 0; i < periodsNeeded; i++) {
            poem_array.push('.');
        }

        var pLen = poem_array.length / M;
            while(poem_array.length) {
                poem_array_2d.push(poem_array.splice(0,pLen));
            }


        for(let i = 1; i <= poem_array_2d.length; i+=2) {
            if(poem_array_2d[i] == null) {continue;}
            //this.reverseList(poem_array_2d[i]);
            poem_array_2d[i].reverse();
        }

        //return poem_array_2d;
        this.setState({poemArr: poem_array_2d});
    }

    // Reverse every other list in a 2d array
    /*reverseList(arr) {
        var l = 0;
        var r = arr.length-1;
        while(l < r) {
            let t = arr[r];
            arr[r] = arr[l];
            arr[l] = t;
            l++;
            r--;
        }
    }*/

    render() {
        return (
            <div>
                <form className="input-container" onSubmit={this.handleSubmit}>
                    <textarea
                        rows='1'
                        name="poemInput" />
                    <input name="numColumns" />
                    <input type='submit' value='Beautify'/>
                </form>
                <ZigzagResult 
                    columns={this.state.numColumns}
                    poem_array={this.state.poemArr}
                />
            </div>
        );
    }
}

export default InputPrompt;