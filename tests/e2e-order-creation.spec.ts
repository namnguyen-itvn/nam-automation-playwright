import { test, expect, Browser } from '@playwright/test';
import { LoginPage } from '../pages/login-page/login-page';
import {loginTestData} from '../test-data/sauce-account'
import { ProductPage } from '../pages/product-page/product-page';
import { CheckoutPage } from '../pages/checkout-page/checkout-page';
import { CartPage } from '../pages/cart-page/cart-page';
import { CheckoutOverviewPage } from '../pages/checkout-overview-page/checkout-overview-page';


const loginData: any = loginTestData();

test.beforeAll(async ({ browser }) => {
    //TBD
});

test('E2E - Ensure order creation successfully', async ({ browser }) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginSaucePage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutOverviewPageElement = new CheckoutOverviewPage(page);
    await test.step('Login and Navigate to Product page', async () => {
        await loginSaucePage.goto(`https://www.saucedemo.com/`);
        await loginSaucePage.login(loginData.admin_account.username, loginData.admin_account.password)
    });
    
    await test.step('On Product page - Add product as product name Sauce Labs Backpack', async () => {
        await productPage.addProductByText();
    });

    await test.step('On Product Page - Click Add to Cart button the add product into cart', async () => {
        await productPage.clickOnAddToCart();
        await productPage.verifyCartIncreased("1");
        await productPage.verifyRemoveButtonEnabled();
    });

    await test.step('On Product Page - Click Cart icon at the top right', async () => {
        await productPage.clickOnCartIcon();
    });

    await test.step('On Cart Page - Click on Checkout button', async () => {
        await cartPage.clickOnCartButton();
    });

    await test.step('On Checkout Page: Your Information - Enter all required information', async () => {
        await checkoutPage.enterUserInfor(loginData.admin_account.firstname, loginData.admin_account.lastname, loginData.passcode);
    });

    await test.step('On Checkout Page: Click on Continue button', async () => {
        await checkoutPage.clickOnContinueButton();
    });

    await test.step('Checkout: Overview Page: Verify that product infos correct', async () => {
        await checkoutOverviewPageElement.verifyCartTitle();
        await checkoutOverviewPageElement.verifyQuantityProduct();
        await checkoutOverviewPageElement.verifyProductPrice();
        await checkoutOverviewPageElement.clickOnFinishButton();
    });
    await context.close();
});