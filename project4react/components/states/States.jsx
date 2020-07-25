import React, { Fragment } from 'react';
import './States.css';
import Input from './Input'

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.recalculatePossibleStates = this.recalculatePossibleStates.bind(this);
    this.state = {
      possibleStates: window.cs142models.statesModel()
    };
  }

  recalculatePossibleStates(text) {
    let newList = window.cs142models
                          .statesModel()
                          .filter((state, idx) => state.includes(text));
    this.setState({possibleStates: newList});
  }

  renderList(list) {
    let liList = list.map((value, idx) => <li key={value}>{value}</li>)
    return (
      <ul>
        {liList}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <Input doOnTextChange={this.recalculatePossibleStates}/>
        {this.renderList(this.state.possibleStates)}
      </div>
    );
  }
}

export default States;
