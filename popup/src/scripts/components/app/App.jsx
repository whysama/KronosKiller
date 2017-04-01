import React, {Component} from 'react';
import DayPicker from '../day-picker/DayPicker';
//import {connect} from 'react-redux';
import '../../../css/style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects : this.props.projects,
      period : this.props.period,
      disabled : this.props.disabled
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
            <div className="day-picker">
                <DayPicker period={this.state.period} disabled={this.state.disabled}/>
            </div>
        </div>
    );
  }
}

export default App;
