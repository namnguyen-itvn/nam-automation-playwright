import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';

const product = 'Sauce Labs Backpack'
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

  readonly productDetailPage = {
    addToCart: '[id="add-to-cart-sauce-labs-backpack"]',
    productPrice: '//div[@class="inventory_details_price"]',
    removeButton: '[id="remove-sauce-labs-backpack"]',
    cartIcon: '[id="shopping_cart_container"] a',
    cartNumberProductAdded: '[id="shopping_cart_container"] span',
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

  async navigateToProductPage() {
    await this.navigateTo("https://www.saucedemo.com/inventory.html");
  }
  
  async addProductByText(){
    await this.clickItemByText(product)
  }

  async getProductPrice(){
    await this.waitAndGetText(this.productDetailPage.productPrice);
  }

  async clickOnAddToCart(){
    await this.waitAndClick(this.productDetailPage.addToCart);
  }

  async clickOnCartIcon(){
    await this.waitAndClick(this.productDetailPage.cartIcon);
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

  async verifyRemoveButtonDisabled() {
    await this.page.waitForTimeout(500);
    await this.verifyElementDisabled(this.productDetailPage.removeButton);
  }

  async verifyRemoveButtonEnabled() {
    await this.page.waitForTimeout(500);
    await this.verifyElementVisible(this.productDetailPage.removeButton);
  }

  async verifyCartIncreased(text: string){
    const productNumberIncreased = await this.waitAndGetText(this.productDetailPage.cartNumberProductAdded);
    await expect(productNumberIncreased).toEqual(text);
  }
}