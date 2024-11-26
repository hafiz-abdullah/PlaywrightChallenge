import { test, Page } from '@playwright/test';

import { firstTest ,fourthdTest,secondTest, thirdTest} from '../pageObjectModel.ts/homeTestPageWebObj';
import Hooks from '../Hooks/hooks';


Hooks.register()

//Fix the below scripts to work consistently and do not use static waits. Add proper assertions to the tests
// Login 3 times sucessfully
test('Login multiple times sucessfully @c1', async ({ page }) => {
  await Hooks.homeTestPage.loginIntoMultipletimes(firstTest.firstTestButton);

});

// Login and logout successfully with animated form and delayed loading
test('Login animated form and logout sucessfully @c2', async ({ page }) => {
  await Hooks.homeTestPage.logOutProperly(secondTest.secondTestButton);


});

// Fix the Forgot password test and add proper assertions
test('Forgot password @c3', async ({ page }) => {
  await Hooks.homeTestPage.forgotPassword(thirdTest.thirdTestButton);

});

//Fix the login test. Hint: There is a global variable that you can use to check if the app is in ready state
test('Login and logout @c4', async ({ page }) => {
  await Hooks.homeTestPage.loginAndLogout(fourthdTest.fourthTestButton)
});
