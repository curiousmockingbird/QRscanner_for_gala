function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function processQRCode(decodedText) {
  try {
    // Trim and split the decoded text to get the Ticket ID
    let ticketInfo = decodedText.trim().split(/\s+/);
    let ticketID = ticketInfo[0]; // Assuming the first part is the Ticket ID

    // Open the Google Spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    // Find the column indices for 'ID' and 'Attendance'
    const headers = data[0];
    const ticketIDColIndex = headers.indexOf('ID');
    const attendanceColIndex = headers.indexOf('Attendance');

    // Error handling if columns are not found
    if (ticketIDColIndex === -1 || attendanceColIndex === -1) {
      return 'Error: "ID" or "Attendance" column not found in the sheet.';
    }

    let found = false;
    for (let i = 1; i < data.length; i++) {
      // Ensure the Ticket ID comparison is consistent (both as strings)
      if (String(data[i][ticketIDColIndex]) === ticketID) {
        found = true;
        let attendanceStatus = data[i][attendanceColIndex];

        // Check if the ticket has already been checked in
        if (attendanceStatus === 'Checked In') {
          return `Ticket ID: ${ticketID} has already been checked in.`;
        } else {
          // Get the cell reference for attendance
          let cell = sheet.getRange(i + 1, attendanceColIndex + 1);

          // Set the background color first, then set the value
          cell.setBackground('#37e21e');        // Set the background color to green
          SpreadsheetApp.flush();             // Force the change to apply immediately
          cell.setValue('Checked In');        // Set the value of the cell
          SpreadsheetApp.flush();             // Apply changes again
          
          return `Ticket ID: ${ticketID} - Checked In Successfully.`;
        }
      }
    }

    if (!found) {
      return `Error: Ticket ID ${ticketID} not found.`;
    }

  } catch (error) {
    // Return detailed error message for debugging
    Logger.log(`Error processing QR Code: ${error.message}`);
    return `Error processing QR Code: ${error.message}`;
  }
}

// testing
