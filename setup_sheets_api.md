# Google Sheets API Setup

Follow these steps to create a Google Cloud project and obtain credentials:

1. **Create a Google Cloud Project**: Go to the [Google Cloud Console](https://console.cloud.google.com/), create a new project.

2. **Enable Google Sheets API**: In the Google Cloud Console, go to the [`APIs & Services > Library`](https://console.cloud.google.com/apis/library) and search `google sheets api` and enable it.

3. **Create Service Account**: Under `APIs & Services > Credentials`, create a Service Account, move to `Keys` section, click `Add Key` and choose `JSON` and create then the file start to download then save it as `sce-students.json` in the root of your project.

4. **Share Sheet with Service Account**: Share your Google Sheet (linked to your Google Form) with the Service Account email (found in the JSON key: `client_email`).
