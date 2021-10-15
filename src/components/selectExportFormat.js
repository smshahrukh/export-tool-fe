import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server'


const SelectExportFormat = ({ formats, component, data }) => {

    const [selectedFormat, setSelectedFormat] = useState("")

    const handleChange = (event) => {
        setSelectedFormat(event.target.value);
    }

    const exportToHTML = () => {
        const comp = <div>{component}</div>
        const htmlString = ReactDOMServer.renderToStaticMarkup(comp)

        downloadFile("report.html", htmlString)
    }

    const jsonToXml = (obj) => {
        let xml = '';
        for (var prop in obj) {
          xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
          if (obj[prop] instanceof Array) {
            for (var array in obj[prop]) {
              xml += "<" + prop + ">";
              xml += jsonToXml(new Object(obj[prop][array]));
              xml += "</" + prop + ">";
            }
          } else if (typeof obj[prop] == "object") {
            xml += jsonToXml(new Object(obj[prop]));
          } else {
            xml += obj[prop];
          }
          xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
        }
        const xmlString = xml.replace(/<\/?[0-9]{1,}>/g, '');
        return xmlString
    }
    const exportToXML = () => {
        const xmlText = jsonToXml(data);
        downloadFile("report.xml", xmlText)
    }

    const downloadFile = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    const exportToCSV = () => {

        const replacer = (key, value) => value === null ? '' : value
        const header = Object.keys(data[0])
        const csv = [
            header.join(','), // header row first
            ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
        ].join('\r\n')

        //Download the file as CSV
        const downloadLink = document.createElement("a");
        const blob = new Blob(["\ufeff", csv]);
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `report.csv`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

    }

    const handleSubmit = () => {
        if (selectedFormat === "CSV") {
            exportToCSV()
        } else if (selectedFormat === "XML") {
            exportToXML()
        } else {
            exportToHTML()
        }
    }

    return (

        <div>
            <label>
                Pick Export Format:
                <select value={selectedFormat} onChange={handleChange}>
                    {formats && formats.length > 0 && formats.map(format => <option value={format.label} >{format.label}</option>)}

                </select>
            </label>
            <input type="button" value="Export" disabled={!data || data.length < 1} onClick={handleSubmit} />
        </div>
    )

}

export default SelectExportFormat;