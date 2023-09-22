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
    emailText: '[id="email"]',
    passwordText: '[id="password"]',
    forgotPassword:'//a[@href="/forgot-password"]',
    loginButton: '//button >> text=Login',
    googleLoginButton: '//button[contains(text(),"Continue with ")]',
  }

  /* ============ Function =============== */

  async login(email: string, password: string) {
    const emailElement = await this.page.$(this.loginElements.emailText);
    if (emailElement) {
      await this.waitAndFill(this.loginElements.emailText, email);
      await this.waitAndFill(this.loginElements.passwordText, password);
      await this.waitAndClick(this.loginElements.loginButton);
      await this.verifyElementNotVisible(this.loginElements.loginButton);
    }
  }

  /* ============ Verification =============== */
  
  async verifyHeader() {
    expect(this.page).toHaveTitle("Elfie Console")
  }

  async verifyEmailText() {
    const getEmailText = await(this.getAttributeValue(this.loginElements.emailText,'placeholder'));
    expect(await this.verifyElementVisible(this.loginElements.emailText));
    expect(getEmailText).toBe('Email');
  }

  async verifyPasswordText() {
    const getPasswordText = await(this.getAttributeValue(this.loginElements.passwordText,'placeholder'));
    expect(await this.verifyElementVisible(this.loginElements.passwordText));
    expect(getPasswordText).toBe('Password');
  }

  async verifyLoginButton() {
    const loginText = await(this.waitAndGetText(this.loginElements.loginButton));
    expect(await this.verifyElementVisible(this.loginElements.loginButton));
    expect(loginText).toBe('Login');
  }

  async verifyForgotPassword() {
    const forgotPasswordText = await(this.waitAndGetText(this.loginElements.forgotPassword));
    expect(await this.verifyElementVisible(this.loginElements.forgotPassword));
    expect(forgotPasswordText).toBe('Forgot password?');
  }
}