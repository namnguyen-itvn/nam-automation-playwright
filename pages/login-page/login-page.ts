import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page';
export class LoginPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  
  /* ============ Elements =============== */

  readonly loginElements = {
    userName: '[id="user-name"]',
    passwordText: '[id="password"]',
    loginButton: '[id="login-button"]',
    errorHandler: '//h3 [@data-test="error"]',
  }

  /* ============ Function =============== */

  async login(userName: string, passWord: string) {
    const usernameElement = await this.page.$(this.loginElements.userName);
    if (usernameElement) {
      await this.waitAndFill(this.loginElements.userName, userName);
      await this.waitAndFill(this.loginElements.passwordText, passWord);
      await this.waitAndClick(this.loginElements.loginButton);
    }
  }

  /* ============ Verification =============== */
  
  async verifyHeader() {
    expect(this.page).toHaveTitle("Swag Labs")
  }

  async verifyLoginForm() {
    await this.page.waitForTimeout(2000);
    await this.verifyElementVisible(this.loginElements.userName);
    await this.verifyElementVisible(this.loginElements.passwordText);
    await this.verifyElementVisible(this.loginElements.loginButton);
  }

  async verifyErrorHandlerWhenBlankUserName() {
    const usernameElement = await this.page.$(this.loginElements.userName);
    if (usernameElement) {
      await this.waitAndClick(this.loginElements.loginButton);
    }
    const errorHandlerMessage = await(this.waitAndGetText(this.loginElements.userName));
    expect(await this.verifyTextContent(errorHandlerMessage, "Epic sadface: Username is required"));
  }

  async verifyErrorHandlerWhenBlankPassword(userName: string) {
    const usernameElement = await this.page.$(this.loginElements.userName);
    if (usernameElement) {
      await this.waitAndFill(this.loginElements.userName, userName);
      await this.waitAndClick(this.loginElements.loginButton);
    }
    const errorHandlerMessage = await(this.waitAndGetText(this.loginElements.userName));
    expect(await this.verifyTextContent(errorHandlerMessage, "Epic sadface: Password is required"));
  }
}