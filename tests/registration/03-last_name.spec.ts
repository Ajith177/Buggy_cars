import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe.serial('Buggy cars - Last Name', () => {
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

  test('REG_LN_001-Verify error Message when Input is empty',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('   ')
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_081.png')})
  });

  test('REG_LN_002-Verify error Message when Input is Empty and length is 10',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('   ')
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_082.png')})
  });

  test('REG_LN_003-Verify error Message when Input is empty and length is 10',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('          ')
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_083.png')})
  });

  test('REG_LN_004 - Small Character less than 2',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('g')
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_084.png')})
  });

  test('REG_LN_005 - Small Character length greater than 10 less than 20',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('gjbhfihfrertt')
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_085.png')})
  });

  test('REG_LN_006 - Small Character length greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('gjbhfihfrerttjhfiohirhfrkfjorfrjoifjorijfhfrjefiugegiudiudheihduheiuheiufu')
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_086.png')})
  });

  test('REG_LN_007 - Blank spaces + Small Character greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('gjbhfihfrer                 thtrg')
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_087.png')})
  });

  test('REG_LN_008 - Blank spaces + Small Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('gjbhfihfrerttjhfiohirhfrkfjo                ffggttgggggggggggggggggg')                                          
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_088.png')})
  });

  test('REG_LN_009 - Capital Character with Length 10',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('KJBFBRFHFK')                                             
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_089.png')})
  });

  test('REG_LN_010 - Capital Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('IURFRFIURHUHBSJHBAJKSHQOIHSPOSJKDJENDKJEHEOIEDJKFNRKUFHRFIOHFKJRNFJRBFIUFHGIRFHKJRHFIRFHIRU')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_090.png')})
  });

  test('REG_LN_011 - Capital Character + Empty Spaces length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('IURFRFIURHUHBSJHBAJKSH          ')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_091.png')})
  });

  test('REG_LN_012 - Small + Capital Character ',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('ihfiuhfrhfEHBDIHDEHDEIHHUIF')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_092.png')})
  });

  test('REG_LN_013 - Small + Capital Character + Empty Spaces length less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('ihfiuhfrhfEHBDIHDEHDEIHHUIF           ')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_093.png')})
  });

  test('REG_LN_014 - Numbers length 10',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('7798738377')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_094.png')})
  });

  test('REG_LN_015 - Numbers Greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('7798738377379379039303983876687687793709382080928278627687298279879873837836784768787')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_095.png')})
  });

  test('REG_LN_016 - Small Character + Numbers greater than 20 and less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('jnfijtitnijnt39389889fnjfn9u29u9u')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_096.png')})
  });

  test('REG_LN_017 - Small Character + Numbers greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('jnfijtitnijnt39389889fnjfn9u29u9uhjfirhfjrhfoirjf94ur94ioekfjoiru9irorijt09h')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_097.png')})
  });

  test('REG_LN_018 - Small Character + Capital Characters + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('jnfijtitKJHRHFI983993983729988JHIH')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_098.png')})
  });

  test('REG_LN_019 - Small Character + Capital Characters + Empty Spaces + Numbers Length 49',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('jnfijtitKJHRHFI983993983729988JHIH      frfrfJFHRIFRI83739783798')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_099.png')})
  });

  test('REG_LN_020 - Accepts Special Characters or Not',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('@#$%^&*(')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0100.png')})
  });

  test('REG_LN_021 - Accepts Special Characters length greater than 20 and less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('@#$%^&*(@&^@*^@@&@&@&@(*(*&(*&*#^YGUGIUY*')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0101.png')})
  });

  test('REG_LN_022 - Special Character length greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('#$%^&$^&&&^^$$#@$#!$$&*((^&&$^&^^$#$^&*(*&^#@#$%^&*(*&^#$^&*(*#@#$^&*##$^&')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0102.png')})
  });

  test('REG_LN_023 - Small + Special Character length = 10',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('#$%^&$^&&&^^$$#@$#!$$&*((^&&$^&^^$#$^&*(*&^#@#$%^&*(*&^#$^&*(*#@#$^&*##$^&')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0103.png')})
  });

  test('REG_LN_024 - Small + Special Character length greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('hihhhfrhrfirfrif@#$%^&#$%^&*jkfnjiniuhfhiuhivlmfokjijr@#$%^&$%^&*(*&%^&*(')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0104.png')})
  });

  test('REG_LN_025 - Small + Capital + Special Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('hihhhfrhrfirJNRIF@#$%^&*(#$%^')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0105.png')})
  });

  test('REG_LN_026 - Small + Capital + Special Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('hihhhfrhrfirJNRIF@#$%^&*(#$%^ffjfrfiorjoiJDNOIFRFHIO!@#$%^&*((*@#$%^&*#@$%^&*')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0106.png')})
  });

  test('REG_LN_027 - Small + Capital + Special Characters + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0107.png')})
  });

  test('REG_LN_028 - Small + Capital + Special Characters + Numbers greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435joifjrhfiorji@#$%^&*ufhirfhihfii')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0108.png')})
  });

  test('REG_LN_029 - Small + Capital + Special Characters + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435joifjrhfiorji@#$%^&*ufhirfhihfii')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0109.png')})
  });

  test('REG_LN_030 - Small + Capital + Special Characters + Numbers + Empty spaces greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435joifjrhfiorji@#$%^&*ufhirfhihfii              ')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0110.png')})
  });

  test('REG_LN_031 - Checking with Emojis',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌🤷‍♀️😎😎😎')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0111.png')})
  });

  test('REG_LN_032 - Emoji length less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌🤷‍♀️😎😎😎😮😁😮😁😮😁😮😮')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0112.png')})
  });

  test('REG_LN_033 - Emoji length Greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌🤷‍♀️😎😎😎😮😁😮😁😮😁😮😮🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0113.png')})
  });

  test('REG_LN_034 - Emoji + Small Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌jbihrfoirfjofoirjforjo')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0114.png')})
  });

  test('REG_LN_035 - Emoji + Capital Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌JHIHIFRJRO')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0115.png')})
  });

  test('REG_LN_036 - Emoji + Capital + Small  Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌JHIHIFRJROuifhriuhfu')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0116.png')})
  });

  test('REG_LN_037 - Emoji + Capital Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌KFNROFRFIRJFOFJRJ😎😎😎😎😎😎😎😎😎😎😎😎😎😎')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0117.png')})
  });

  test('REG_LN_038 - Emoji + Capital + Small Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌KFNROFRFIRJFJFRNkmkrfjrofro😎')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0118.png')})
  });

  test('REG_LN_039 - Emoji + Capital + Small Character + Numbers greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌KFNROFRFIRJFJFRNkmkrfjrofro😎9404800984038483040')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0119.png')})
  });

  test('REG_LN_040 - Emoji + Capital + Small Character + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#lastName')).toBeVisible()
    await page.locator('#lastName').fill('😎✌😎✌🤷‍♀️😎✌KRNkmkrfjrro😎94040')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_LN_0120.png')})
  });

  test.afterAll(async () => {
    if (page) await page.close();
  });
});