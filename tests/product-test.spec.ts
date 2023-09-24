import { test, expect, Browser } from '@playwright/test';
import { LoginPage } from '../pages/login-page/login-page';
import {loginTestData} from '../test-data/sauce-account'
import { ProductPage } from '../pages/product-page/product-page';


const loginData: any = loginTestData();

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
});

test('Product page - Suite - Verify Product page', async ({ browser }) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginSaucePage = new LoginPage(page);
    const productPage = new ProductPage(page);
    await test.step('Login and Navigate to Produc page', async () => {
        await loginSaucePage.goto(`https://www.saucedemo.com/`);
    });
    
    await test.step('TC 01 - Ensure the header showing correct', async () => {
        await loginSaucePage.verifyHeader();
    });

    await test.step('TC 02 - Ensure system should showing the error message when user leave username blank', async () => {
        await loginSaucePage.verifyErrorHandlerWhenBlankUserName
    });

    await test.step('TC - 03 - Ensure system showing the error message when user leave password blank', async () => {
        await loginSaucePage.verifyErrorHandlerWhenBlankPassword
    });

    await test.step('TC - 04 - Ensure user can logged in success with correct username and password', async () => {
        await loginSaucePage.login(loginData.admin_account.username, loginData.admin_account.password)
        await productPage.verifyHamburgerMenuIsVisible();
    });

    await context.close();
});