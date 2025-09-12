import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe.serial('Buggy cars', () => {
  let page;
  const screenshotDir = path.join(__dirname, 'screenshots');

  // Runs once before all tests
  test.beforeAll(async ({ browser }) => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const context = await browser.newContext();
    page = await context.newPage();
    await page.waitForTimeout(3000)
    await page.goto('https://buggy.justtestit.org/');
  });

  // Your actual test
  test('REG_000 - Check Title is Present Or not.', async () => {
    await expect(page).toHaveTitle('Buggy Cars Rating');
    await page.waitForTimeout(4000)
    await page.screenshot({ path: path.join(screenshotDir, 'REG_000.png') });
  });

  // Runs once after all tests
  test.afterAll(async () => {
    await page.close();
  });
});
