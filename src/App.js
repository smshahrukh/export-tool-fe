import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DatepickerComponent from "./components/datepicker"
import SelectExportFormat from "./components/selectExportFormat"
import DataTable from "./components/DataTable"

const BASE_URL = process.env.REACT_APP_BASE_URL;
function App() {
  const [formats, setFormats] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchExportFormats = async () => {
      const formatsRequest = await fetch(`${BASE_URL}/format`)
      const data = await formatsRequest.json()

      setFormats(data.formats)
    }
        
    fetchExportFormats()
  }, [BASE_URL])

  const handleGetReport = async () => {
    const reportRequest = await fetch(`${BASE_URL}/report?startDate=${startDate}&endDate=${endDate}`)
    const data = await reportRequest.json()

    console.log("data: ", data)
    if (!data.error) {
      setReportData(data.data)
    }
  }
  const DataTableComponent = ({ rData }) => <DataTable data={rData} />
  return (
    <div className="App">
      <div>
        <DatepickerComponent label="Start Date" date={startDate} onChange={setStartDate} />
        <DatepickerComponent label="End Date" date={endDate} onChange={setEndDate}/>
        <input type="button" value="Get Report" onClick={handleGetReport} />

        <SelectExportFormat formats={formats} component={<DataTableComponent rData={reportData} />} data={reportData} />

        <DataTableComponent rData={reportData} />
      </div>
    </div>
  );
}

export default App;
