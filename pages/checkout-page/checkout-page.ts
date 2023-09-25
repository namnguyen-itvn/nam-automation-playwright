import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CheckoutPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  
  /* ============ Elements =============== */

  readonly checkoutPageElement = {
    checkoutTitle: '//span[@class="title"]',
    firstNameTxt: '[id="first-name"]',
    lastNameTxt: '[id="last-name"]',
    passcode: '[id="postal-code"]',
    continueBtn: '[id="continue"]'
  }

  /* ============ Function =============== */

  async clickOnContinueButton(){
    await this.waitAndClick(this.checkoutPageElement.continueBtn);
  }

  async enterUserInfor(fName: string, pWord: string, pCode: string){
    await this.waitAndFill(this.checkoutPageElement.firstNameTxt, fName);
    await this.waitAndFill(this.checkoutPageElement.lastNameTxt, pWord);
    await this.waitAndClick(this.checkoutPageElement.passcode);//click to fill
    await page.keyboard.press('Backspace');
  }

  /* ============ Verification =============== */
  
  async verifyCheckoutTitle() {
    const title = await this.getAttributeValue(this.checkoutPageElement.checkoutTitle, 'innerText');
    expect(title).toBe("Your Cart");
  }
}