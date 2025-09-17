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
    await page.locator('#password').fill('aswe')   
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.locator('#confirmPassword').fill('ertp')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0159.png')})
  });

  test('REG_CP_002 - Blank spaces on password and characters on confirm password',async()=>{
    await page.reload();
    await page.locator('#password').fill('  ')   
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.locator('#confirmPassword').fill('ertp')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0160.png')})
  });

  test('REG_CP_003 - Checking the Functionality of the Cancel button',async()=>{
    await page.reload();
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.locator('#confirmPassword').fill('ertp')  
    await page.getByRole('button',{name:'Cancel'}).click()                                       
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0161.png')})
  });

  test('REG_CP_004 - Checking the Functionality of the Cancel button',async()=>{
    await page.reload();
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
    await page.getByRole('link',{name:'Register'}).click()
    await expect(page.locator('#username')).toBeVisible()
    await page.locator('#username').fill('smart')                    
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0162.png')})
  });

  test('REG_CP_005 - Input for First_name',async()=>{
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('kumar')      
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0163.png')})
  });

  test('REG_CP_006 - Input for Last_name',async()=>{
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('b')
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0164.png')})
  });

  test('REG_CP_007 - Input for Password',async()=>{
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('Kumar@123')
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0165.png')})
  });

  test('REG_CP_008 - Input for Confirm_Password',async()=>{
    await expect(page.locator('#confirmPassword')).toBeVisible()
    await page.locator('#confirmPassword').fill('Kumar@123')
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0166.png')})
  });

  
  test('REG_CP_009 - Click on Cancel and Register Button',async()=>{
    await page.getByRole('button',{name:'Cancel'}).click()
    await page.getByRole('link',{name:'Register'}).click()
    await page.screenshot({path:path.join(screenshotDir,'REG_CP_0167.png')})
  });




  test.afterAll(async () => {
    if (page) await page.close();
  });
});