import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";


const Datepicker = ({ setSearchDateString, setSelectedEndDateString, isRangeSearch }) => {

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const dateToString = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0')
    }

    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <Button variant="outline-secondary" className="example-custom-input" onClick={onClick} ref={ref}>
          {value}
          {
                isCalendarOpen ? <AiFillCaretUp /> : <AiFillCaretDown />
            }
        </Button>
      ));

    useEffect(() => {
        setSearchDateString(dateToString(startDate))
        setSelectedEndDateString(dateToString(endDate))
    }, [startDate, endDate])

    if (isRangeSearch) {
        return (
            <div style={{ display: 'flex', align: 'right' }}>
            <div style= {{ marginRight: '16px'}}>
                <DatePicker 
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            customInput={<ExampleCustomInput />}
                            maxDate={new Date()}
                        />
            </div>
            <div style= {{ marginRight: '16px'}}>
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            customInput={<ExampleCustomInput />}
                            minDate={startDate}
                            maxDate={new Date()}
                        />
            </div>
            <div >
            <Button variant="primary">search</Button>
            </div>
            </div>
        )
    } else {
        return (
            <DatePicker
                selected={startDate}
                selectsStart
                customInput={<ExampleCustomInput />}
                maxDate={new Date()}
            />
        )
    }

}

export default Datepicker
