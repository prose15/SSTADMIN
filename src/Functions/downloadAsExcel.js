import * as XLSX from 'xlsx'; 


 function downloadAsExcel (data) {
    let name=data[0].name
        const dataToExport = [
          ['S.No', 'Name',  'Date of work',  'Service Name',  'Project Name', 'Cost center', 'Billable Stauts', 'From time',  'To time'],
          [], 
          ...data.map((item, index) => [
              index + 1,
              item.name,
              item.timesheetDate,
              item.serviceName,
              item.projectName,
              item.costCenter,
              item.billableStatus,
              item.startTime,
              item.endTime,
          ])
      ];

        const workbook = XLSX.utils.book_new();                  // Create a new workbook and worksheet             
        const worksheet = XLSX.utils.aoa_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');        // Add the worksheet to the workbook
        XLSX.writeFile(workbook, `${name} Timesheet.xlsx`);        // Save the workbook as an Excel file
      };
      export default downloadAsExcel