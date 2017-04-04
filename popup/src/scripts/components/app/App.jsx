import React, {Component} from 'react';
import DayPicker from '../day-picker/DayPicker';
import moment from 'moment';
import { DateUtils } from 'react-day-picker';
//import {connect} from 'react-redux';
import '../../../css/style.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects : this.props.projects,
            period : this.props.period,
            selectedDays : []
        }
        this.handleDayClick = this.handleDayClick.bind(this);
        this.disabledDays = this.disabledDays.bind(this);
    }
  
    handleClick(){
        console.log(this.state.projects);
    }

    handleDayClick(day, { selected }){
        const { selectedDays } = this.state;
            if (selected) {
                const selectedIndex = selectedDays.findIndex(selectedDay =>
                    DateUtils.isSameDay(selectedDay, day),
                );
                selectedDays.splice(selectedIndex, 1);
            } else {
                selectedDays.push(day);
            }
            this.setState({ selectedDays });
    }

    disabledDays(day){
        return day.getDay() === 0 || day.getDay() === 6 || this.props.disabled.includes(moment(day).format("YYYYMMDD"));
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
                        disabledDays={ this.disabledDays }
                        selectedDays = { this.state.selectedDays }
                        onDayClick = { this.handleDayClick }
                        />
                </div>
            </div>
        );
    }
}

export default App;
