const { app, BrowserWindow, WebContentsView, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let contentView;
let navView;

// Shared layout update function
function updateLayout() {
  const [width, height] = mainWindow.getContentSize();
  const isHome = contentView.webContents.getURL().includes('home.html');
  
  // Content view covers entire window
  contentView.setBounds({ x: 0, y: 0, width: width, height: height });
  
  // Nav view positioned in top-right corner: 24px from top and right, 36x36px
  // Hide nav view on home page
  if (isHome) {
    navView.setBounds({ 
      x: width - 36 - 24, 
      y: 24, 
      width: 0, 
      height: 0 
    });
  } else {
    navView.setBounds({ 
      x: width - 36 - 24, 
      y: 24, 
      width: 36, 
      height: 36 
    });
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    backgroundColor: '#dbe4eb'
  });


  contentView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  mainWindow.contentView.addChildView(contentView);

  // Create nav view that will render on top
  navView = new WebContentsView({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  mainWindow.contentView.addChildView(navView);
  navView.setBackgroundColor('#00000000'); // Transparent background

  mainWindow.on('resize', updateLayout);

  // Load nav.html
  navView.webContents.loadFile('nav.html');

  // Load home.html by default
  contentView.webContents.loadFile('home.html').then(() => {
    updateLayout();
  });
}

ipcMain.on('change-site', (event, url) => {
  if (url === 'home.html') {
    contentView.webContents.loadFile('home.html');
  } else {
    contentView.webContents.loadURL(url);
  }

  // Wait for the URL to change, then update the layout
  // 'did-finish-load' ensures the bounds change AFTER the URL is registered
  contentView.webContents.once('did-stop-loading', () => {
    updateLayout();
  });
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});