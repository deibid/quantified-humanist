const { app, BrowserWindow, Tray, Notification, ipcMain } = require('electron');

const schedule = require('node-schedule');

const opn = require('opn');

let masterJob;
let notification;

//default url
let url = 'https://itp-productivity-tracker.herokuapp.com/';


let win = undefined;
let tray = undefined;


function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({
        width: 300,
        height: 550,
        show: false,
        frame: false,
        resizable: true
    })



    win.loadFile('index.html')

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })


    notification = new Notification({
        "title": "Hey, David",
        "body": "Don't forget to log your habits this morning"

    });

    notification.show();

    notification.on('click', () => {
        opn(url);
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    createTray();
    // scheduleTimer();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})




ipcMain.on('sendValuesToMain', (event, arg) => {

    console.log(`tengo el objeto->   ${JSON.stringify(arg)}`);

    let hour = arg.hour;
    let minute = arg.minute;
    url = arg.url;

    scheduleTimer(minute, hour);

    win.hide();

});





function scheduleTimer(minute, hour) {

    //cancel any previously scheduled alarms
    if (masterJob !== undefined) {
        masterJob.cancel();
        masterJob = undefined;
    }


    masterJob = schedule.scheduleJob(`${minute} ${hour} * * *`, sendNotification);
    console.log(`Scheduled every day at ${hour}:${minute}`);

}


function sendNotification() {
    console.log("Sending notification");
    notification.show();
}

function createTray() {

    tray = new Tray("assets/app-icon.png");
    tray.on('click', () => {

        toggleWindow();

    });

}

function toggleWindow() {

    if (win.isVisible()) {
        win.hide();
    } else {
        showWindow();
    }

}

const showWindow = () => {
    const trayPos = tray.getBounds()
    const windowPos = win.getBounds()
    let x, y = 0
    if (process.platform == 'darwin') {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height)
    } else {
        x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
        y = Math.round(trayPos.y + trayPos.height * 10)
    }


    win.setPosition(x, y, false)
    win.show()
    win.focus()
}
