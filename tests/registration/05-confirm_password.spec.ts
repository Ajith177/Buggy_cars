import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe.serial('Buggy cars - Confirm Password', () => {
  let page;
  const screenshotDir = path.join(__dirname, 'screenshots');

  test.beforeAll(async ({ browser }) => {
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://buggy.justtestit.org/register');
  });

  test('REG_CP_001 - Checking the Confirm Password Functionality by the Input in password',async()=>{
    await page.reload();
    await page.waitForTimeout(4000)
    await page.locator('#password').fill('aswe')   
    await page.waitForTimeout(4000)
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.waitForTimeout(4000)
    await page.locator('#confirmPassword').fill('ertp')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0159.png')})
  });

  test('REG_CP_002 - Blank spaces on password and characters on confirm password',async()=>{
    await page.reload();
    await page.waitForTimeout(4000)
    await page.locator('#password').fill('  ')   
    await page.waitForTimeout(4000)
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.waitForTimeout(4000)
    await page.locator('#confirmPassword').fill('ertp')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0160.png')})
  });

  test('REG_CP_003 - Checking the Functionality of the Cancel button',async()=>{
    await page.reload();
    await page.waitForTimeout(4000)
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.waitForTimeout(4000)
    await page.locator('#confirmPassword').fill('ertp')  
    await page.waitForTimeout(4000)
    await page.getByRole('button',{name:'Cancel'}).click()
    await page.waitForTimeout(4000)                                       
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0161.png')})
  });

  test('REG_CP_004 - Checking the Functionality of the Cancel button',async()=>{
    await page.reload();
    await page.waitForTimeout(4000)
    await page.getByRole('link',{name:'Register'}).click()
    await page.waitForTimeout(4000)
    await expect(page.locator('#username')).toBeVisible() 
    await page.locator('#username').fill('smart')
    await page.waitForTimeout(4000)
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('kumar')
    await page.waitForTimeout(4000)
    await expect(page.locator('#lastname')).toBeVisible()
    await page.locator('#lastname').fill('b')
    await page.waitForTimeout(4000)
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('Kumar@123')
    await page.waitForTimeout(4000)
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.locator('confirmPassword').fill('Kumar@123')
    await page.waitForTimeout(40000)                       
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0162.png')})
    await page.getByRole('button',{name:'Cancel'}).click()
    await page.waitForTimeout(4000)
    await page.getByRole('link',{name:'Register'}).click()
    await page.waitForTimeout(4000)
    await page.screenshot({path:path.join(screenshotDir,'Sample.png')})
  });









  test.afterAll(async () => {
    if (page) await page.close();
  });
});