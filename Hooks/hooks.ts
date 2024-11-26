import { test as base, Page, TestInfo, BrowserContext } from '@playwright/test';
import WebActions from '../Utils/WebActions';
import { AppConfig } from '../config';
import homeTestPages from "../pages.ts/HomeTestPage";

class Hooks {
  static webAction: WebActions;
  static homeTestPage: homeTestPages;

  static register() {
    base.beforeEach(async ({ page }: { page: Page }) => {
      Hooks.webAction = new WebActions(page);
      await Hooks.webAction.navigateToURL(AppConfig.BaseURL);

      Hooks.homeTestPage = new homeTestPages(page);
    });

    base.afterEach(async ({ context }: { context: BrowserContext }, testInfo: TestInfo) => {
      const allPages = context.pages();
      for (const page of allPages) {
        // Uncomment to use screenshots or additional actions
        // await Screenshot.takeScreenshot(page, `${testInfo.title} ${allPages.indexOf(page)}`, testInfo.status);
      }
    });
  }
}

export default Hooks;
