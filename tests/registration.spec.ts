import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';


test.describe.serial('Buggy cars - Registration', () => {
  let page;
  const screenshotDir = path.join(__dirname, 'screenshots');

  // Runs once before all tests
  test.beforeAll(async ({ browser }) => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const context = await browser.newContext();
    page = await context.newPage();
    await page.waitForTimeout(1000)
   
  });

  test('REG_000 - Check Title is Present Or not.', async () => {
    await page.goto('https://buggy.justtestit.org/');
    await page.waitForTimeout(3000)
    await expect(page).toHaveTitle('Buggy Cars Rating');
    await page.waitForTimeout(4000)
    await page.getByRole('link',{name:'Register'}).click()
    await page.waitForTimeout(2000)
    await page.screenshot({ path: path.join(screenshotDir, 'REG_000.png') });
    await expect(page.locator("#username")).toBeVisible();
  });

  test('REG_001 - Verify error Message when Input is Empty',async()=>{
    // await page.goto('https://buggy.justtestit.org/register')
    await page.waitForTimeout(1000)
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(2000);
    await page.locator('#username').fill('    ')
    await page.waitForTimeout(4000)
    await page.screenshot({path:path.join(screenshotDir, 'REG_001.png')});
  });

  test('REG_002 - Blank Inputs of length 10',async()=>{
    await page.reload();
    await page.waitForTimeout(1000)
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(3000)
    await page.locator('#username').fill('           ')
    await page.waitForTimeout(4000)
    await page.screenshot({path:path.join(screenshotDir,'REG_002.png')});
  });

  test('REG_003 - Blank Inputs of length greater than 25 (30)',async()=>{
    await page.reload();
    await page.waitForTimeout(4000);
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(4000)
    await page.locator('#username').fill('                                   ')
    await page.screenshot({path:path.join(screenshotDir,'REG_003.png')});
  });

  test.afterAll(async () => {
    if(page){
      await page.close();
    }
  });
});
