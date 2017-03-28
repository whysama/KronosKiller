import React, {Component} from 'react';
import DayPicker from '../day-picker/DayPicker';
//import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects : this.props.projects
    }
  }
  
  handleClick(){
    console.log(this.state.projects);
  }

  render() {
    return (
      <div>
      <button className="app" onClick={() => this.handleClick()}>
        test
      </button>
        <DayPicker/>
      </div>
    );
  }
}

export default App;
