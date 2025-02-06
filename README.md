# Google Apps Script: QR Code Ticket Scanner

This project provides a **web-based QR code scanner** and a **server-side script** to mark event attendees as “Checked In” within a Google Sheet. It leverages:

- **HTML5 QR Code library** (in the browser)
- **Google Apps Script** (server side) to process the scanned text and update the sheet

---

## How It Works

1. **User Accesses the Web App**  
   When you publish your Apps Script as a web app, the user sees the `Index.html` interface with a live camera feed.

2. **Scanning a QR Code**  
   - The camera scans a QR code via the **HTML5Qrcode** library.  
   - Once a QR code is detected, the `decodedText` is sent to the `processQRCode(decodedText)` function (in `processQRcode.js`).

3. **Processing the QR Code**  
   - The script **extracts the Ticket ID** from the scanned text (assuming the first space-separated value is the ID).  
   - It looks up this ID in the Google Sheet.  
   - If found, it checks whether the attendee is already marked as “Checked In.” If not, the script updates the *Attendance* column to say “Checked In,” turning the cell green.

4. **Result Display**  
   - The user sees a **success or error message** (e.g., “Checked In Successfully” or “Ticket ID not found”) in the browser interface.

---

## Project Files

### 1. `processQRcode.js`
- **`doGet()`**  
  Returns `Index.html` as the default page for the web app.

- **`processQRCode(decodedText)`**  
  - Splits the decoded text to find the Ticket ID.  
  - Searches the sheet for a matching ID.  
  - Marks the attendee as “Checked In” (green cell) or returns an error if not found.

### 2. `Index.html`
- Includes the **HTML5Qrcode** library.  
- Displays a camera feed for scanning QR codes.  
- Has **Start** and **Stop** scanner buttons.  
- Sends scanned data (`decodedText`) to the Apps Script server-side function (`google.script.run.processQRCode(...)`).  
- Shows the response message (success or error) to the user.

---

## Google Sheet Requirements

- The sheet must have the following header columns (exactly named):  
  - **ID**  
  - **Attendance**

- “Checked In” status is stored in the **Attendance** column.

---

## Setup Instructions

1. **Create a New Google Apps Script Project**  
   - In [script.google.com](https://script.google.com), create a new project, or attach Apps Script to an existing Google Sheet.

2. **Add Files**  
   - Create a file named **`processQRcode.js`** for the server-side script.  
   - Create an **HTML** file named **`Index.html`** for the front-end code.

3. **Authorize Script**  
   - The first time you run functions or publish the web app, Google will prompt you for any necessary permissions (e.g., to read/write the Sheet).

4. **Publish the Web App**  
   - Go to **Deploy → New deployment**.  
   - Select **Web app** type.  
   - Choose execution and access settings.  
   - Copy the URL provided after deployment.

5. **Access the Scanner**  
   - Open the web app URL in a desktop/laptop browser or on a mobile device.  
   - Grant camera permission (if prompted).  
   - The scanner UI will appear.

---

## Using the Scanner

1. **Click “Start Scanner”**  
   - The camera feed appears, scanning for QR codes in real-time.

2. **Scan the QR Code**  
   - Once recognized, the script automatically sends the decoded text to `processQRCode`.

3. **View the Result**  
   - If the ID is found (and not previously checked in), the script updates the row to “Checked In” and colors the cell green.  
   - The on-screen message confirms success or displays any errors (e.g., missing ID).

4. **Stop Scanner (Optional)**  
   - Click **Stop Scanner** to pause scanning.

---

## Troubleshooting

- **No Camera Access**  
  Make sure browser permissions allow camera usage.

- **Columns Not Found**  
  Ensure your Google Sheet has columns named **ID** and **Attendance**.

- **Already Checked In**  
  The script won’t re-check an attendee. It simply returns a message that the ID was previously used.

---

## License & Credits

- **QR scanning** is powered by the [HTML5Qrcode](https://github.com/mebjas/html5-qrcode) library.  
- All other code is provided **as-is**. Feel free to modify for your use case.
