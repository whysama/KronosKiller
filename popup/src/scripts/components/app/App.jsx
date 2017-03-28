import React, {Component} from 'react';
//import {connect} from 'react-redux';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  handleClick(){
    console.log(this.props.projects);
  }

  render() {
    return (
      <button className="app" onClick={() => this.handleClick()}>
        test
      </button>
    );
  }
}

export default App;
