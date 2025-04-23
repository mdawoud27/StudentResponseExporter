import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auth setup
const auth = new google.auth.GoogleAuth({
  keyFile: './sce-students.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const extractSpreadsheetId = (url: string): string | null => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// Spreadsheet setup
const sheetUrl = process.env.SHEET_URL!;
const spreadsheetId = extractSpreadsheetId(sheetUrl);

if (!spreadsheetId) {
  throw new Error('Invalid Google Sheet URL!');
}

const sheetName = 'Form Responses 1';

const exportStudentResponses = async () => {
  try {
    const client = (await auth.getClient()) as JWT;
    const sheets = google.sheets({ version: 'v4' });
    google.options({ auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheetName,
    });

    const allRows = response.data.values;
    if (!allRows || allRows.length < 2) {
      console.log('No data found.');
      return;
    }

    const header = allRows[0];
    const rows = allRows.slice(1);

    const outputDir = path.join(__dirname, '../students_responses');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    header.forEach((student: string, colIndex: number) => {
      const responses = rows
        .map((row) => row[colIndex]?.trim())
        .filter(Boolean)
        .join('\n\n');

      const fileName = path.join(
        outputDir,
        `Student_${student || colIndex + 1}.txt`,
      );
      fs.writeFileSync(fileName, responses || '');
      console.log(`✔️ Saved responses for: Student ${student || colIndex + 1}`);
    });

    console.log('✅ All student responses exported!\n');
  } catch (err: any) {
    console.error('❌ Error fetching data:', err.message);
  }
};

// Run every 1 second
exportStudentResponses();
setInterval(exportStudentResponses, 1000);
