import React, {Component} from 'react';
import DayPicker from '../day-picker/DayPicker';
import Select from 'react-select';
import Radio from 'rc-radio';
import moment from 'moment';
import { DateUtils } from 'react-day-picker';
//import {connect} from 'react-redux';
import '../../../css/style.css';
import 'react-select/dist/react-select.css';
import 'rc-radio/assets/index.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects : this.props.projects,
            period : this.props.period,
            selectedDays : [],
            selectedProject : "",
            text : "",
            selectedPlace : ""
        }
        this.handleDayClick = this.handleDayClick.bind(this);
        this.disabledDays = this.disabledDays.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePlaceChange = this.handlePlaceChange.bind(this);
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

    handleTextChange(event){
        this.setState({text: event.target.value}, this.sendToContent);
    }

    handlePlaceChange(event){
        this.setState({selectedPlace: event.target.value}, this.sendToContent);
    }

    sendToContent(){
        const { selectedDays } = this.state,
              { selectedProject } = this.state;
        let selectedDaysToSend = [],
            selectedProjectToSend = selectedProject,
            text = this.state.text,
            selectedPlace = this.state.selectedPlace;
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
                selectedDays: selectedDaysToSend,
                selectedProject : selectedProjectToSend,
                text : text,
                selectedPlace : selectedPlace
            });
        }.bind(this));
    }

    render() {
        if (this.props.projects.length === 0) {
            return (<h1 className="app-disabled">Kronos is completed.</h1>);
        }
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
                <div className="project">
                    <div className="project-select">
                        <Select
                            simpleValue
                            options={this.props.projects}
                            value={this.state.selectedProject}
                            onChange={ this.handleProjectChange }
                            searchable={this.state.searchable} />
                    </div>
                    <div className="project-radio">
                        <div>
                            <Radio value="as"
                              checked = {this.state.selectedPlace === 'as'}
                              onChange={this.handlePlaceChange}/>
                            <span className="project-radio-label">Censio</span>
                        </div>
                        <div>
                            <Radio value="wfh"
                              checked = {this.state.selectedPlace === 'wfh'}
                              onChange={this.handlePlaceChange}/>
                            <span className="project-radio-label">Home</span>
                        </div>
                    </div>
                    <textarea 
                        className="project-textarea"
                        value={this.state.text} 
                        onChange={this.handleTextChange} 
                        rows="9"/>
                </div>
            </div>
        );
    }
}

export default App;
