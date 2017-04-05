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
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day),
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays }, this.sendToContent);
    }

    disabledDays(day){
        return day.getDay() === 0 || day.getDay() === 6 || this.props.disabled.includes(moment(day).format("YYYYMMDD"));
    }

    handleProjectChange(newProject){
        this.setState({ selectedProject : newProject }, this.sendToContent);
    }

    sendToContent(){
        const { selectedDays } = this.state,
              { selectedProject } = this.state;
        console.log(selectedProject);
        let selectedDaysToSend = [];
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            for (let i = 0; i < selectedDays.length; i++) {
                selectedDaysToSend.push(moment(selectedDays[i]).format("YYYYMMDD"));
            }
            chrome.tabs.sendMessage(tabs[0].id, { 
                from: 'popup', 
                subject: 'ContentAction',
                selectedDays: selectedDaysToSend
            });
        }.bind(this));
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
                        value={this.state.selectedProject}
                        onChange={ this.handleProjectChange }
                        searchable={this.state.searchable} />
                </div>
            </div>
        );
    }
}

export default App;
