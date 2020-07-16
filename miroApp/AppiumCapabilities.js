const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
        platformName: "Android",
        platformVersion: "9",
        deviceName: "emulator-5556",
        app: "C:\\Users\\212772038\\Downloads\\Miro.apk",
        appPackage: "com.realtimeboard",
        appActivity: "com.realtimeboard.MainActivity",
        automationName: "UiAutomator2",
        orientation: "PORTRAIT",
        newCommandTimeout: "500"
    }
};

module.exports = {
    opts
}