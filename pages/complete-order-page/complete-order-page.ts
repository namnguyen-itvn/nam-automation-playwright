import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CompleteOrderPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  
  /* ============ Elements =============== */

  readonly completeOrderPageElement = {
    completeOrderMessage: '//h2[@class="complete-header"]',
    backToProductButton: '[id="back-to-products"]',
    completeOrderTitle: '//span[@class="title"]'
  }

  /* ============ Function =============== */

  async clickOnBackToProduct() {
    await this.waitAndClick(this.completeOrderPageElement.backToProductButton);
  };

  /* ============ Verification =============== */
  async verifyCartTitle() {
    await this.page.waitForTimeout(1000);
    const title = await this.getAttributeValue(this.completeOrderPageElement.completeOrderTitle, 'innerText');
    expect(title).toBe("Checkout: Complete!");
  }

  async verifyThankyouMessage() {
    const qtyProduct = this.waitAndGetText(this.completeOrderPageElement.completeOrderMessage);
    expect(qtyProduct).toBe("Thank you for your order!");
  }

  async verifyBackToProductButtonVisible() {
    await this.verifyElementVisible(this.completeOrderPageElement.backToProductButton)
  };
}