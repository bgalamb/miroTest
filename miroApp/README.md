## Testing repository for Miro mobile App

This repository contains a test case which shows how to test Miro mobile app with the
help of Apppium. Use node.js to open this repo.

###Technical

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
    
###Testing

to test certain paths in your app create classes which have 
+ pre test steps - which take you to the part which you want to test eg. login
+ test steps - perform the actual steps
+ post step steps - validation and cleanup steps

Consider doing these classes abstract. If so you can create exhaustive tests without too much coding by extending the original test class and overriding the test steps. Eg, authentication through Basic,SAML, OAUth etc...
