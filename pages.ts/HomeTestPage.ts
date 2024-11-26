import WebActions from '../Utils/WebActions';
import { firstTest, fourthdTest, secondTest, thirdTest } from '../pageObjectModel.ts/homeTestPageWebObj';


export default class HomeTestPage {

    page;
    webAction: WebActions;
    constructor(page) {
        this.page = page;
        this.webAction = new WebActions(page);
    }

    async loginIntoMultipletimes(locator:string) {
        await this.webAction.clickElement(locator)
        for (let i = 1; i <= 3; i++) {
            await this.webAction.clickElement(firstTest.email)
            await this.webAction.enterElementTextWithJS(firstTest.email, `test${i}@example.com`)
            await this.webAction.enterElementTextWithJS(firstTest.password, `password${i}`)
            await this.webAction.clickElement(firstTest.submitButton)
            await this.webAction.verifyElementContainsText(firstTest.successMessage, 'Successfully submitted!')
            await this.webAction.verifyElementContainsText(firstTest.successMessage, `Email: test${i}@example.com`);
            await this.webAction.verifyElementContainsText(firstTest.successMessage, `Password: password${i}`)
        }
    }

    async logOutProperly(locator:string) {
        await this.webAction.clickElement(locator)
        await this.webAction.enterElementText(firstTest.email, `test1@example.com`)
        await this.webAction.enterElementText(firstTest.password, `password1`)
        await this.webAction.clickElement(firstTest.submitButton)
        await this.webAction.clickElementJS(secondTest.menuButton)
        await this.webAction.clickElement(secondTest.logoutOption)
    }

    async forgotPassword(locator:string) {
        await this.webAction.clickElement(locator)
        await this.webAction.clickElement(thirdTest.forgotPasswordButton)
        await this.webAction.enterElementText(firstTest.email, `test@example.com`)
        await this.webAction.clickElement(thirdTest.resetPasswordButton)
        await this.webAction.verifyElementContainsText(thirdTest.successMessage, 'Success!')
        await this.webAction.verifyElementContainsText(thirdTest.successMessage, `Password reset link sent!`);
        await this.webAction.verifyElementContainsText(thirdTest.successMessage, `Email: test@example.com`)
    }

    async loginAndLogout(locator:string) {
        await this.webAction.clickElement(locator)
        await this.webAction.enterElementText(firstTest.email, `test@example.com`)
        await this.webAction.enterElementText(firstTest.password, `password`)
        await this.webAction.clickElement(firstTest.submitButton)
        await this.webAction.verifyElementContainsText(fourthdTest.logo, `Dashboard`)
        await this.webAction.clickElement(fourthdTest.profileButton)
        await this.webAction.clickElement(fourthdTest.logout)
    }
}
