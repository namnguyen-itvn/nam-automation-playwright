import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CheckoutOverviewPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  
  /* ============ Elements =============== */

  readonly checkoutOverviewPageElement = {
    cartTitle: '//span[@class="title"]',
    cartQuantityProduct: '//div[@class="cart_quantity"]',
    cartPriceOfProduct: '//div[@class="inventory_item_price"]',
    cartBtn: '[id ="finish"]',
    cartProductName: '//div[@class="inventory_item_name"]',
  }

  /* ============ Function =============== */

  async clickOnFinishButton(){
    await this.waitAndClick(this.checkoutOverviewPageElement.cartBtn);
  }

  /* ============ Verification =============== */
  
  async verifyCartTitle() {
    await this.page.waitForTimeout(1000);
    const title = await this.getAttributeValue(this.checkoutOverviewPageElement.cartTitle, 'innerText');
    expect(title).toBe("Your Cart");
  }

  async verifyQuantityProduct() {
    const qtyProduct = this.waitAndGetText(this.checkoutOverviewPageElement.cartQuantityProduct);
    expect(qtyProduct).toBe("1");
  }

  async verifyProductPrice() {
    const priceProduct = await this.getAttributeValue(this.checkoutOverviewPageElement.cartPriceOfProduct, 'innerText');
    expect(priceProduct).toBe("$29.99");
  }
  
}