# Student Response Exporter

This project fetches responses from a **Google Sheets** form linked to a **Google Form**, processes them, and saves the responses for each student as individual `.txt` files. It automatically runs every 1 second and generates the files in a folder named `students_responses`.

first of all you should link your `google form` with `google sheet`

## Features

- Extracts student responses from Google Sheets.
- Saves each student’s responses into a separate `.txt` file.
- Runs every second (can be adjusted).

## Setup

1. **clone the repo**

   ```bash
   git clone https://github.com/mdawoud27/StudentResponseExporter.git
   ```

2. **Install dependencies**

   ```bash
   npm i
   ```

3. Setup Google Sheets API [_follow these instractions_](./setup_sheets_api.md)

4. **Create a** `.env` **file**

   ```js
   SHEET_URL = '<your-google-sheet-link>';
   ```

5. **Run the script**

   ```bash
   # compile the ts
   npx tsc

   # run
   node dist/extractStudents.js
   ```

   The script will:

   - Fetch the data from your Google Sheet.
   - Create `.txt` files for each student with their responses.
   - Update every 1 second.

### The generated files will be saved in the students_responses directory

```bash
 students_responses
├── Student_1.txt
├── Student_2.txt
├── Student_3.txt
└── ...
```
