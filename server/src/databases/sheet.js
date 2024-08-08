import { google } from 'googleapis';
import dotenv from 'dotenv';


dotenv.config();

const initializeGoogleSheets = async () => {
  try {

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    console.log("Spreadsheet is live ...");

    return { auth, spreadsheetId, googleSheets };
  } catch (error) {
    console.error("Error initializing Google Sheets:", error);
    throw error; // Optionally rethrow the error if you want to handle it further up the call stack
  }
};

// Exporting the initialization function
export default initializeGoogleSheets;
