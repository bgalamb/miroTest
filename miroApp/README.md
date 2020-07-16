## Testing repository for Miro mobile App

This repository contains a test case which shows how to test Miro mobile app with the
help of Apppium. Use node.js to open this repo.

### Installation 
+ Download and install https://nodejs.org/en/
+ Download and install appium from http://appium.io/docs/en/drivers/android-uiautomator2/
+ Download and install android studio to get AVD manager tool
+ Download and install Webstorm IDE for Javascript
+ Download and install Android emulator which will be used to run the tests. in my case (Nexus 5x api28)
+ Start the emulator
+ Download Miro apk file from https://apkpure.com/miro-online-collaborative-whiteboard-platform/com.realtimeboard
+ install webdriverio with npm: ___npm install webdriverio__


P.S.: Basically follow the steps from http://appium.io/docs/en/about-appium/getting-started/ to have an intial setup.


### Technical

Each screen has its own class. Each class has a 
+ __Fields__<br>
    Each field represent one element on the screen: button, input etc.
    The mapping between the program and the fields on the Device's screen is done with locators in properties/properties.file .
    ```javascript
    sticky.text  = new UiSelector().text("*Convert handwritten*").className("android.widget.TextView")'
    ```
    Changing these properties enable you to adapt to other devices without code modification.

+ __Methods__ <br>
   to interact with the fields by calling them from your proram.
   
To test certain paths in your app create classes which have 
+ pre test steps - which take you to the part which you want to test eg. login
+ test steps - perform the actual steps
+ post step steps - validation and cleanup steps

Consider doing these classes abstract. If so you can create exhaustive tests without too much coding by extending the original test class and overriding the test steps. Eg, authentication through Basic,SAML, OAUth etc...
    
### Testing

Make sure to adjust appium's initial capabilities ___AppiumCapabilities.js___, with the 
  + device's or Emulator's details where you want to run the tests.  
  + apk file location
  
Create a new node.js run configuration for the javascript file index.js
Open Webstorm and right click on package.json. Select ___npm install___ to install the dependencies.



