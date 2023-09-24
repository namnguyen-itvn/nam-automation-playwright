import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

const BASEURL = "https://www.saucedemo.com/";
export class ProductPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  
  /* ============ Elements =============== */

  readonly productPageElement = {
    hamburgerMenu: '[id="react-burger-menu-btn"]',
    shoppingCart: "[id='//div[@id='shopping_cart_container']']",
    productTitle: (text: string) => `//div[@class='inventory_item'] //img[@alt='${text}']`,
    addToCartBtn: '[id="add-to-cart-sauce-labs-backpack"]',
    subMenuAllItem: '[id="inventory_sidebar_link"]',
    subMenuAbout: '[id="about_sidebar_link"]',
    subMenuLogout: '[id="logout_sidebar_link"]',
    subMenuResetAppState: '[id="reset_sidebar_link"]',
  }

  /* ============ Function =============== */

  async openHamburgerMenu() {
    await this.waitAndClick(this.productPageElement.hamburgerMenu);
    await this.page.waitForTimeout(4000); //wait for load seach
  }

  async clickLogout() {
    await this.openHamburgerMenu();
      await this.waitAndClick(this.productPageElement.subMenuLogout);
    }

    async navigateToProducPage() {
        await this.navigateTo("https://www.saucedemo.com/inventory.html");
    }

  /* ============ Verification =============== */
  
  async verifyHamburgerMenuIsVisible() {
    await this.verifyElementVisible(this.productPageElement.hamburgerMenu);
  }

  async verifyHamburgerMenuSubItem() {
    await this.openHamburgerMenu();
    await this.verifyElementVisible(this.productPageElement.subMenuAllItem);
    await this.verifyElementVisible(this.productPageElement.subMenuAbout);
    await this.verifyElementVisible(this.productPageElement.subMenuLogout);
    await this.verifyElementVisible(this.productPageElement.subMenuResetAppState);
  }

  async verifyUserLoggedOutAfterClickedLogout() {
    await this.openHamburgerMenu();
    await this.clickLogout();
  }


}