import React from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class SelectMultipleDays extends React.Component {
    constructor(props) {
        super(props);
        this.disabledDays = this.disabledDays.bind(this);
        this.state = {
            selectedDays: [],
        };
    }

    disabledDays(day){
        return day.getDay() === 0 || day.getDay() === 6 || this.props.disabled.includes(moment(day).format("YYYYMMDD"));
    }

    render() {
        return ( 
	        <div>
	            <DayPicker
	            	canChangeMonth = { false }
	            	initialMonth={ this.props.initialMonth }
	            	disabledDays={ this.disabledDays }
		            selectedDays = { this.props.selectedDays }
	            	onDayClick = { this.props.onDayClick }
	            /> 
	        </div>
        );
    }
}
