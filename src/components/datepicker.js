import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatepickerComponent = ({ label, date, onChange }) => {
  return (
      <label> {label}
          <DatePicker selected={date} onChange={(date) => onChange(date)} />
      </label>
  );
};

export default DatepickerComponent;