# Electron Web Index

A simple desktop application built with Electron to index webpages of various origin.

Entries in **index-data.json** are automatically populated into **home.html** when you run `npm start` or `npm run build`.

Click a link to view the webpage in-app. Click the close button to return to the index home.

### Prerequisites

- **Node.js & npm**

### Installation & Running

```bash
git clone https://github.com/Acheulean-Lab/Index_App
cd Index_App

npm install
npm start
```

## Project Structure

- **main.js**: Manages window lifecycle and layout.
- **home.html**: Index page listing all links (generated from the template and index-data.json).
- **home.template.html**: HTML template used to build home.html.
- **build.js**: Script that reads index-data.json and home.template.html and writes home.html.
- **nav.html**: Back/close button.
- **preload.js**: Secure IPC bridge.
- **index-data.json**: Titles and URLs for index entries. 

