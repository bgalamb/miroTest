const wdio = require("webdriverio");
const propertiesReader = require('properties-reader');
const appium = require('./AppiumCapabilities');
const assert = require('assert')

const properties = propertiesReader('properties/properties.file');

async function main () {
     new BasicAuthTest().performTest();
}

class AuthTest {

    client;

    async performTest(){
        await this.preTestSteps();
        await this.testSteps();
        await this.postTestSteps();
    }

    async preTestSteps(){
        this.client = await wdio.remote(appium.opts);
        await this.client.pause(properties.get('timeout.appium.launch'))
        this.client.setImplicitTimeout(properties.get('timeout.appium.implicit'))
    }

    async executeLogon(){
    }

    async testSteps(){
        await this.executeLogon();
    }

    async postTestSteps(){
        const stickies = new StickyNotesScreen(this.client);
        assert(await stickies.init());
        await stickies.notNowAction();

        const allBoards = new AllBoardsScreen(this.client);
        assert(await allBoards.init());
        await allBoards.newBoardAction();

        const floorplan = new BoardFloorplanScreen(this.client);
        this.client.setImplicitTimeout(100000)
        assert(await floorplan.init());

        await this.client.pause(properties.get(20000))
        console.log(await this.client.getPageSource())
        await this.client.deleteSession();
    }

}
//implementation class for basic auth
class BasicAuthTest extends AuthTest {
    async executeLogon() {
        const login = new BasicLogonScreen(this.client);
        assert(await login.init());
        await login.enterCredentials();
        await login.logonAction();
    }
}

//test implementation class for saml auth
class SAMLAuthTest extends AuthTest {
    async performLogin() {
        const login = new BasicLogonScreen(this.client);
        assert(await login.init());
        await login.enterCredentials();
        await login.logonAction();
    }
}

class BasicLogonScreen {

    constructor(client) {
        this.client = client;
    }

    async init(){
        this.emailField = await this.client.$(`android=${(properties.get('locator.logon.emailTF'))}`);
        this.passwordField = await this.client.$(`android=${(properties.get('locator.logon.passwordTF'))}`);
        this.signInField = await this.client.$(`android=${(properties.get('locator.logon.signinBT'))}`);
        return this.isReady();
    }

    async isReady(){
        return (await this.emailField.isExisting()) && (await this.passwordField.isExisting());
    }

    async enterCredentials(){
        await this.emailField.setValue(properties.get('auth.basic.username'));
        await this.passwordField.setValue(properties.get('auth.basic.password'));
    }

    async logonAction(){
        await this.client.touchAction({
            action: 'tap',
            element: this.signInField
        });
    }
}

class StickyNotesScreen {

    constructor(client) {
        this.client = client;
    }

    async init(){
        this.tryNowField  = await this.client.$(`android=${(properties.get('locator.sticky.tryNow'))}`);
        this.notNowField  = await this.client.$(`android=${(properties.get('locator.sticky.notNow'))}`);
        return this.isReady();
    }

    async isReady(){
        return (await this.tryNowField.isExisting()) && (await this.notNowField.isExisting())
    }

    async notNowAction(){
        await this.client.touchAction({
            action: 'tap',
            element: this.notNowField
        });
    }
}

class AllBoardsScreen {

  constructor(client) {
        this.client = client;
    }

    async init(){
        this.allBoardsField = await this.client.$(`android=${(properties.get('locator.allBoards.text'))}`);
        this.newBoardField = await this.client.$(`android=${(properties.get('locator.allBoards.newBoard'))}`);
        this.boardsField = await this.client.$(`android=${(properties.get('locator.allBoards.footerBoards'))}`);
        this.feedField = await this.client.$(`android=${(properties.get('locator.allBoards.footerFeed'))}`);
        return this.isReady();
    }

    async isReady(){
        return (await this.allBoardsField.isExisting()) && (await this.newBoardField.isExisting())
    }

    async newBoardAction(){
        await this.client.touchAction({
            action: 'tap',
            element: this.newBoardField
        });
    }
}

class BoardFloorplanScreen {

    constructor(client) {
        this.client = client;
    }

    async init(){
        this.home  = await this.client.$(`android=${(properties.get('locator.boardFloormap.home'))}`);
        this.document  = await this.client.$(`android=${(properties.get('locator.boardFloormap.document'))}`);
        this.plus  = await this.client.$(`android=${(properties.get('locator.boardFloormap.plus'))}`);
        return this.isReady();
    }

    async isReady(){
        return (await this.home.isExisting()) && (await this.document.isExisting())
    }

}


main();