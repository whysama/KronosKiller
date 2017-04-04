import React, {Component} from 'react';
import DayPicker from '../day-picker/DayPicker';
import Select from 'react-select';
import moment from 'moment';
import { DateUtils } from 'react-day-picker';
//import {connect} from 'react-redux';
import '../../../css/style.css';
import 'react-select/dist/react-select.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects : this.props.projects,
            period : this.props.period,
            selectedDays : [],
            selectedProject : ""
        }
        this.handleDayClick = this.handleDayClick.bind(this);
        this.disabledDays = this.disabledDays.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
    }
  
    handleClick(){
        console.log(this.state.projects);
    }

    handleDayClick(day, { selected }){
        const { selectedDays } = this.state;
        let selectedDaysToSend = [];
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day),
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays });

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            for (let i = 0; i < selectedDays.length; i++) {
                selectedDaysToSend.push(moment(selectedDays[i]).format("YYYYMMDD"));
            }
            chrome.tabs.sendMessage(tabs[0].id, { 
                from: 'popup', 
                subject: 'SelectDays',
                selectedDays: selectedDaysToSend
            });
        }.bind(this));
    }

    disabledDays(day){
        return day.getDay() === 0 || day.getDay() === 6 || this.props.disabled.includes(moment(day).format("YYYYMMDD"));
    }

    handleProjectChange(newProject){
        this.setState({ selectedProject : newProject });
    }

    render() {
        return (
            <div className="app">
                <div className="day-picker">
                    <DayPicker
                        initialMonth={ new Date(this.props.period.year,this.props.period.month) } 
                        disabledDays={ this.disabledDays }
                        selectedDays = { this.state.selectedDays }
                        onDayClick = { this.handleDayClick }
                        />
                </div>
                <div className="project-select">
                    <Select
                        simpleValue
                        options={this.props.projects}
                        name="selected-project"
                        value={this.state.selectedProject}
                        onChange={ this.handleProjectChange }
                        searchable={this.state.searchable} />
                </div>
            </div>
        );
    }
}

export default App;
