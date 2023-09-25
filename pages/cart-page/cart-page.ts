import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

export class CartPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  
  /* ============ Elements =============== */

  readonly cartPageElement = {
    cartTitle: 'span.title',
    cartQuantityProduct: '//div[@class="cart_quantity"]',
    cartPriceOfProduct: '//div[@class="inventory_item_price"]',
    cartBtn: '[id ="checkout"]',
    cartProductName: '//div[@class="inventory_item_name"]',
    cartRemoveBtn: '[id="remove-sauce-labs-backpack"]'
  }

  /* ============ Function =============== */

  async clickOnCartButton(){
    await this.waitAndClick(this.cartPageElement.cartBtn);
  }

  async getProductCartName(){
    await this.waitAndClick(this.cartPageElement.cartProductName);
  }

  /* ============ Verification =============== */
  
  async verifyCartTitle() {
    await this.page.waitForTimeout(300);
    const title = await this.waitAndGetText(this.cartPageElement.cartTitle);
    expect(title).toBe("Your Cart");
  }

  async verifyQuantityProduct() {
    await this.page.waitForTimeout(300);
    const qtyProduct = this.waitAndGetText(this.cartPageElement.cartQuantityProduct);
    expect(qtyProduct).toEqual(1);
  }

  async verifyProductPrice() {
    await this.page.waitForTimeout(300);
    const priceProduct = await this.getAttributeValue(this.cartPageElement.cartPriceOfProduct, 'innerText');
    expect(priceProduct).toBe("$29.99");
  }
  
}