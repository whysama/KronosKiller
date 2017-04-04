import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class SelectMultipleDays extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
	        <div>
	            <DayPicker
	            	canChangeMonth = { false }
	            	initialMonth={ this.props.initialMonth }
	            	disabledDays={ this.props.disabledDays }
		            selectedDays = { this.props.selectedDays }
	            	onDayClick = { this.props.onDayClick }
	            /> 
	        </div>
        );
    }
}
