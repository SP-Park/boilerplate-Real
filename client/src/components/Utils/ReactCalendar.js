import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';;

const ReactCalendar = () => {

  const [startDate, setStartDate] = useState(new Date());

  const onChange = () => {
    setStartDate(startDate)
  }

  return (

      <Calendar
        onChange={onChange}
        value={startDate}
      />
  );
};

export default ReactCalendar
