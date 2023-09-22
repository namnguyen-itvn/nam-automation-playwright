import { expect, Locator, Page } from "@playwright/test";
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ============ Methods =============== */

  async goto(url: string) {
    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
    });
  }

  async navigateTo(link: string) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(link)]);
  }

  async getAttributeValue(locator: string, attribute: string) {
    let element = this.page.locator(locator);
    const attributeValue = await element.getAttribute(attribute);
    return attributeValue;
  }

  async waitAndClick(locator: string, index: number = 0) {
    // Will add checking index out of range when refactoring
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible"
    });
    await element.click();
    await this.page.waitForTimeout(1000);
  }

  async clickItemByText(text: string) {
    await this.waitAndClick(`text='${text}'`);
    await this.page.waitForTimeout(1000);
  }

  async waitAndFill(locator: string, value: string, index: number = 0) {
    // Will add checking index out of range when refactoring
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.fill(value);
    await this.page.waitForTimeout(1000);
  }

  async waitAndSelectByValue(locator: string, value: string, index: number = 0) {
    // Will add checking index out of range when refactoring
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.selectOption({ value: value });
    await this.page.waitForTimeout(1000);
  }

  async waitAndSelectByLabel(locator: string, value: string, index: number = 0) {
    // Will add checking index out of range when refactoring
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.selectOption({ label: value });
    await this.page.waitForTimeout(1000);
  }

  async waitAndSelectByIndex(locator: string, value: number, index: number = 0) {
    // Will add checking index out of range when refactoring
    const element = this.page.locator(locator).nth(index);
    await element.waitFor({
      state: "visible",
    });
    await element.selectOption({ index: value });
    await this.page.waitForTimeout(1000);
  }

  async waitAndGetText(locator: string, index: number = 0): Promise<string> {
    // Will add checking index out of range when refactoring
    const element = this.page.locator(locator).nth(index);
    let elementText = await element.innerText();
    if (elementText === null) {
      return "Element Text is null, Pls check element locator or its textContent";
    } else {
      return elementText;
    }
  }

  async waitAndVerifyText(locator: string, text: string, index: number = 0) {
    // Will add checking index out of range when refactoring
    const element = this.page
      .locator(locator, {
        hasText: `/^${text}$/g`,
      })
      .nth(index);
    await element.waitFor({
      state: "visible",
    });
  }

  /*==================Verification==============*/

  async verifyWebTitle(title: string) {
    const webTitle = await this.page.title();
    expect(webTitle).toContain(title);
  }

  async checkExist(locator: string) {
    return !!(await this.page.$$(locator)).length;
  }

  async verifyTextContent(locator: string, text: string, index: number = 0) {
    let elementText = await this.page.locator(locator).nth(index).textContent();
    if (elementText != null) {
      elementText = elementText.trim();
      expect(elementText).toContain(text);
    }
  }

  async verifyValueContent(locator: string, text: string, index: number = 0) {
    let value = await this.page.locator(locator).nth(index).getAttribute("value");
    expect(value).toContain(text);
  }

  async verifyElementVisible(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect(element).toBeVisible({ timeout: timeout });
    } else {
      await expect(element).toBeVisible();
    }
  }

  async verifyElementNotVisible(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect(element).not.toBeVisible({ timeout: timeout });
    } else {
      await expect(element).not.toBeVisible();
    }
  }

  async softVerifyElementVisible(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect.soft(element).toBeVisible({ timeout: timeout });
    } else {
      await expect.soft(element).toBeVisible();
    }
  }

  async softVerifyElementNotVisible(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect.soft(element).not.toBeVisible({ timeout: timeout });
    } else {
      await expect.soft(element).not.toBeVisible();
    }
  }

  async verifyElementDisabled(locator: string, timeout?: number) {
    const element = this.page.locator(locator).first();
    if (timeout) {
      await expect(element).toBeDisabled({ timeout: timeout });
    } else await expect(element).toBeDisabled({ timeout: timeout })
  }

  async verifyElementColor(locator: string, color: string, index: number = 0) {
    let element = this.page.locator(locator).nth(index);
    const actualColor = await element.evaluate(value => {
      return window.getComputedStyle(value).getPropertyValue("color")
    })
    expect(color).toBe(actualColor)
  }
}
