const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Enable node integration if needed (be cautious)
      contextIsolation: false, // Disable context isolation if required
    },
  });

  // Register a custom 'uploads' protocol to load files from 'uploads' directory
  protocol.registerFileProtocol('uploads', (request, callback) => {
    const filePath = request.url.replace('uploads://', 'C:/users/dhanu/digital-library-manager/uploads/');
    // Ensure the file exists before attempting to load
    fs.stat(filePath, (err, stat) => {
      if (err) {
        console.error('File not found:', err);
        callback({ error: -6 }); // File not found error
      } else {
        callback({ path: filePath }); // Provide the full file path
      }
    });
  }, (error) => {
    if (error) {
      console.error('Failed to register protocol:', error);
    }
  });

  // Load your HTML file or a URL
  mainWindow.loadURL('http://localhost:5000');  // Or load your local HTML
}

// Create the window when the app is ready
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (for macOS compatibility)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle opening the app from a URL (optional)
app.on('open-url', (event, url) => {
  event.preventDefault();
  if (url) {
    console.log('Received URL:', url);
  }
});
