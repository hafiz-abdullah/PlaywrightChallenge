// Import necessary modules and types from Playwright
import { Page, expect } from '@playwright/test';
import path from 'path';
import { waits } from '../config';

export default class WebActions {
    // The `page` property is defined with a type annotation
    private page: Page;

    // Constructor initializes the `page` property
    constructor(page: Page) {
        this.page = page;
    }

    // Navigate to a specified URL
    async navigateToURL(url: string) {
        await this.page.goto(url);
    }

    // Wait for a frame to be attached to the page
    async waitForFrameAttached(locator: string) {
        return this.page.frameLocator(locator);
    }


    // Wait for an element to be attached and return its locator
    async waitForElementAttached(locator: string) {
        const elementLocator = this.page.locator(locator);
        await this.page.waitForLoadState('networkidle', { timeout: waits.elementDisplayWait });
        await elementLocator.first().waitFor({ state: 'attached', timeout: waits.elementDisplayWait });
        await elementLocator.first().waitFor({ state: 'visible', timeout: waits.elementDisplayWait});
        await elementLocator.first().isEditable({ timeout: waits.elementDisplayWait})
        return elementLocator;
    }

    // Check if an element is attached (for verification purposes)
    async waitForElementAttachedVerification(locator: string) {
        return this.page.locator(locator);
    }



    // Introduce a delay
    async delay(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    // Determine if the locator is in a frame and wait for the element
    async elementLocatorFunction(locator: string) {

        return this.waitForElementAttached(locator);
    }

    // Click on an element
    async clickElement(locator: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.click({ force: true });
    }

    // JavaScript-based click for elements
    async clickElementJS(locator: string) {
        await this.page.waitForSelector(locator, { strict: true });
        await this.waitForElementAttached(locator);
        await this.page.locator(locator).evaluate((button) => {
            (button as HTMLElement).click();
        });
    }

    // Double-click an element
    async doubleClickElement(locator: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.dblclick();
    }

    // Enter text into an input field
    async enterElementText(locator: string, text: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.fill(text);
    }

    async enterElementTextWithJS(locator: string, text: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        this.verifyElementExist(locator)
        await elementFound.fill(text);
        await elementFound.evaluate((input, value) => {
            (input as HTMLInputElement).value = value;
        }, text);
    }

    // Check a checkbox
    async checkElement(locator: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.check();
    }

    // Uncheck a checkbox
    async unCheckElement(locator: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.uncheck();
    }

    // Upload a file
    async uploadFile(locator: string, fileName: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.setInputFiles(path.join(__dirname, '..\\Data\\' + fileName));
    }

    // Select an option from a dropdown by label
    async selectOptionFromDropdown(locator: string, option: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.selectOption({ label: option });
    }

    // Select an option from a dropdown by value
    async selectOptionFromDropdownViaValue(locator: string, option: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.selectOption(option);
    }

    // Hover over an element
    async hoverOver(locator: string) {
        const elementFound = await this.elementLocatorFunction(locator);
        await elementFound.hover();
    }

    async verifyElementContainsText(locator: string, text: string) {
        var elementFound = await this.elementLocatorFunction(locator)
        await expect(elementFound).toContainText(text);
    }


    async checkAndClickElement(selector: string) {
        let elementExists = false;

        elementExists = await this.verifyElementExist(selector);
        if (elementExists) {
            await this.clickElement(selector);
            // break;
        }
    }

    async verifyElementExist(selector: string) {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout: waits.elementDisplayWait });
            return true;
        } catch (error) {
            return false;
        }
    }

    async getTextContents(locator: string) {
        try {
            var elementFound = await this.elementLocatorFunction(locator)
            let text = await elementFound.textContent()
            return text.trim();
        }
        catch (error) {
            console.error(error.errorMessage)

        }
    }

    async getElement(locator: string) {
        return await this.elementLocatorFunction(locator)
    }
}
