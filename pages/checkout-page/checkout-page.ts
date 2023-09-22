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

  }

  /* ============ Function =============== */


  /* ============ Verification =============== */
  
}