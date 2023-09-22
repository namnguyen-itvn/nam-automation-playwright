import { test, expect, Browser } from '@playwright/test';
import { LoginPage } from '../pages/login-page/login-page';


test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
});

test('Verify Sauce demo login page', async ({ browser }) => {
    
    const context = await browser.newContext();
    const loginPage = await context.newPage();
    const loginConsolePage = new LoginPage(loginPage);

    await test.step('Go to Sauce demo page', async () => {
        await loginConsolePage.goto(`https://www.saucedemo.com/`);
    });
    
    await test.step('Verify sauce demo login form with email, Password, Login button also', async () => {
        await loginConsolePage.verifyEmailText();
        await loginConsolePage.verifyPasswordText();
        await loginConsolePage.verifyLoginButton();
        await loginConsolePage.verifyForgotPassword();
    });
    await context.close();
});