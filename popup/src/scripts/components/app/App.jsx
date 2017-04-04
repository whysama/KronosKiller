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
                <DayPicker
                    initialMonth={ new Date(this.props.period.year,this.props.period.month) } 
                    disabled={this.state.disabled}
                    />
            </div>
        </div>
    );
  }
}

export default App;
