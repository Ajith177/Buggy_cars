import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe.serial('Buggy cars - Password', () => {
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

  test('REG_P_001-Verify error Message when Input is empty',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('   ')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0121.png')})
  });

  test('REG_P_002- Input is Empty at the length of 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('          ')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0122.png')})
  });

  test('REG_P_003- Input is Empty greater than 20',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('                               ')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0123.png')})
  });

  test('REG_P_004- Input by blank spaces + small Character length of 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('     jetsw')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0124.png')})
  });

  test('REG_P_005- Input by blank spaces + small Character of length Greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('jetyuikjhfihfirhfoirofhoifopsw')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0125.png')})
  });

  test('REG_P_006- Small Characters length less than 5',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('jetyuikjhf')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0126.png')})
  });

  test('REG_P_006- Small Characters length greater than 20',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('jetyuikjhjirhrhfuhrfifhidiejiehiuuudeduhf')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0126.png')})
  });

  test('REG_P_007- Capital Characters length lesser than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ASDFQWER')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0127.png')})
  });

  test('REG_P_008- Capital Characters length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ASDFQWFORIJIRJORJIRJROIJROIIER')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0128.png')})
  });

  test('REG_P_009- Capital + Small Characters at the length of 8',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('agsJDJEUEN')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0129.png')})
  });

  test('REG_P_010- Capital + Small Characters at the length of 20',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('agjhiehesJDJEUKJEBDEDHIEHDIOEHEN')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0130.png')})
  });

  test('REG_P_011- Capital + Small Character + Blank Spaces at the length less than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ASsddAd  ')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0131.png')})
  });

  test('REG_P_012- Capital + Small Character + Blank Spaces at the length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ASsddAdashAQSWS         ')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0132.png')})
  });

  test('REG_P_013- Special Character length of 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('!@#$$%^&*()')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0133.png')})
  });

  test('REG_P_014- Special Character length greater than of 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('!@#$$%^&#$%^&*(#$%^&*(#$%^&**()')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0134.png')})
  });

  test('REG_P_015- Small + Special Character length less than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ghhdd@#$%^')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0135.png')})
  });

  test('REG_P_016- Small + Special Character length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ghhdd@#$%@#$%^#$%^&*hbfrhffjo@#$%^&*^')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0136.png')})
  });

  test('REG_P_017- Capital + Special Character length lesser than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('JRIJFR@#$%')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0137.png')})
  });

  test('REG_P_018- Capital + Special Character length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('JIUFHHFRHIJ@#$%^&*KFMRKFFNFNJN@#$%^&*(')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0138.png')})
  });

  test('REG_P_019- Numbers + Special Character length lesser than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('6262#$%^')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0139.png')})
  });

  test('REG_P_020- Numbers + Special Character length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('6262#$%^87627287@#$%^&*($%^&*($%^87633687')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0140.png')})
  });

  test('REG_P_021- Small + Capital + Special Characters + Numbers less than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('jnfDHEU!@1')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0141.png')})
  });

  test('REG_P_022- Small + Capital + Special Characters + Numbers greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('jnfDHEU!@1fbrfiurJNRNUR!@#$%^&*787282')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0142.png')})
  });

  test('REG_P_023- Emojis of length 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('🏆⚡🏆🏆🏆')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0143.png')})
  });

  test('REG_P_024- Emojis of length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('🏆⚡🏆🏆🏆🙌😮🔥🔥🔥🔥')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0144.png')})
  });

  test('REG_P_025- Small + Capital + Special Character + Number + Blank spaces less than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('asW@#3  ')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0145.png')})
  });

  test('REG_P_026- Small + Capital + Special Character + Number + Blank spaces greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('asW@#3jededUDUEHIDH!@#$%^&9393983')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0146.png')})
  });

  test('REG_P_027- Small Character + Emoji of length 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('asffg🖐🖐🖐😉')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0147.png')})
  });

  test('REG_P_028- Small Character + Emoji of length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('asffdeffrfrfuhidhiejdeoijg🖐🖐🖐😉')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0148.png')})
  });

  test('REG_P_029- Capital Character + Emoji of length lesser than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ASD🖐🖐😉')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0149.png')})
  });

  test('REG_P_030- Capital Character + Emoji of length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('ASDJIHFHRFIOF🏆🏆🏆🙌🖐🖐😉')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0150.png')})
  });

  test('REG_P_031- Numbers + Emoji of length lesser than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('6387🏆😉')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0151.png')})
  });

  test('REG_P_032- Numbers + Emoji of length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('6387343443e🏆😉😂😂😂😂😂😂')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0152.png')})
  });

  test('REG_P_033- Numbers + Emoji of length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('🏆😉!@#$')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0153.png')})
  });

  test('REG_P_034- Numbers + Emoji of length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('🏆😉⚡⚡⚡⚡😮!@#$@#$%^&*(')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0154.png')})
  });

  test('REG_P_035- Blank spaces + Emoji of length lesser than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('   🔥🔥🔥🔥')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0155.png')})
  });

  test('REG_P_036- Blank spaces + Emoji of length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill('   🔥🔥🔥🔥🙌🙌🙌🙌😂🙌')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0156.png')})
  });

  test('REG_P_037- Small + Capital + Special + Numbers + Emoji at length less than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill(' aA#3🖐🏆😉⚡')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0157.png')})
  });

  test('REG_P_038- Small + Capital + Special + Numbers + Emoji at length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#password')).toBeVisible()
    await page.locator('#password').fill(' aA#3222@#$@🖐🏆😉⚡🔥🔥🔥😮🔥')
    await page.screenshot({path:path.join(screenshotDir,'REG_P_0158.png')})
  });


  test.afterAll(async () => {
    if (page) await page.close();
  });
});