import React from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class SelectMultipleDays extends React.Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.disabledDays = this.disabledDays.bind(this);
        this.state = {
            selectedDays: [],
        };
    }

    handleDayClick(day, { selected }) {
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
	            <DayPicker
	            	canChangeMonth = { false }
	            	initialMonth={ new Date(this.props.period.year,this.props.period.month) }
	            	disabledDays={ this.disabledDays }
		            selectedDays = { this.state.selectedDays }
	            	onDayClick = { this.handleDayClick }
	            /> 
	        </div>
        );
    }
}
