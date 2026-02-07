import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe.serial('Buggy cars - First Name', () => {
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

  test('REG_FN_001-Verify error Message when Input is empty',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('   ')
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_041.png')})
  });

  test('REG_FN_002-Verify error Message when Input is empty and length is 10',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('          ')
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_042.png')})
  });

  test('REG_FN_003-Verify error Message when Input is empty and length is 10',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('          ')
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_043.png')})
  });

  test('REG_FN_004 - Small Character less than 2',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('g')
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_044.png')})
  });

  test('REG_FN_005 - Small Character length greater than 10 less than 20',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('gjbhfihfrertt')
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_045.png')})
  });

  test('REG_FN_006 - Small Character length greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('gjbhfihfrerttjhfiohirhfrkfjorfrjoifjorijfhfrjefiugegiudiudheihduheiuheiufu')
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_046.png')})
  });

  test('REG_FN_007 - Blank spaces + Small Character greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('gjbhfihfrer                 thtrg')
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_047.png')})
  });

  test('REG_FN_008 - Blank spaces + Small Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('gjbhfihfrerttjhfiohirhfrkfjo                ffggttgggggggggggggggggg')                                          
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_048.png')})
  });

  test('REG_FN_009 - Capital Character with Length 10',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('KJBFBRFHFK')                                             
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_049.png')})
  });

  test('REG_FN_010 - Capital Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('IURFRFIURHUHBSJHBAJKSHQOIHSPOSJKDJENDKJEHEOIEDJKFNRKUFHRFIOHFKJRNFJRBFIUFHGIRFHKJRHFIRFHIRU')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_050.png')})
  });

  test('REG_FN_011 - Capital Character + Empty Spaces length greater than 10',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('IURFRFIURHUHBSJHBAJKSH          ')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_051.png')})
  });

  test('REG_FN_012 - Small + Capital Character ',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('ihfiuhfrhfEHBDIHDEHDEIHHUIF')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_052.png')})
  });

  test('REG_FN_013 - Small + Capital Character + Empty Spaces length less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('ihfiuhfrhfEHBDIHDEHDEIHHUIF           ')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_053.png')})
  });

  test('REG_FN_014 - Numbers length 10',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('7798738377')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_054.png')})
  });

  test('REG_FN_015 - Numbers Greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('7798738377379379039303983876687687793709382080928278627687298279879873837836784768787')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_055.png')})
  });

  test('REG_FN_016 - Small Character + Numbers greater than 20 and less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('jnfijtitnijnt39389889fnjfn9u29u9u')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_056.png')})
  });

  test('REG_FN_017 - Small Character + Numbers greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('jnfijtitnijnt39389889fnjfn9u29u9uhjfirhfjrhfoirjf94ur94ioekfjoiru9irorijt09h')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_057.png')})
  });

  test('REG_FN_018 - Small Character + Capital Characters + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('jnfijtitKJHRHFI983993983729988JHIH')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_058.png')})
  });

  test('REG_FN_019 - Small Character + Capital Characters + Empty Spaces + Numbers Length 49',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('jnfijtitKJHRHFI983993983729988JHIH      frfrfJFHRIFRI83739783798')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_059.png')})
  });

  test('REG_FN_020 - Accepts Special Characters or Not',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('@#$%^&*(')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_060.png')})
  });

  test('REG_FN_021 - Accepts Special Characters length greater than 20 and less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('@#$%^&*(@&^@*^@@&@&@&@(*(*&(*&*#^YGUGIUY*')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_061.png')})
  });

  test('REG_FN_022 - Special Character length greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('#$%^&$^&&&^^$$#@$#!$$&*((^&&$^&^^$#$^&*(*&^#@#$%^&*(*&^#$^&*(*#@#$^&*##$^&')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_062.png')})
  });

  test('REG_FN_023 - Small + Special Character length = 10',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('#$%^&$^&&&^^$$#@$#!$$&*((^&&$^&^^$#$^&*(*&^#@#$%^&*(*&^#$^&*(*#@#$^&*##$^&')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_063.png')})
  });

  test('REG_FN_024 - Small + Special Character length greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('hihhhfrhrfirfrif@#$%^&#$%^&*jkfnjiniuhfhiuhivlmfokjijr@#$%^&$%^&*(*&%^&*(')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_064.png')})
  });

  test('REG_FN_025 - Small + Capital + Special Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('hihhhfrhrfirJNRIF@#$%^&*(#$%^')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_065.png')})
  });

  test('REG_FN_026 - Small + Capital + Special Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('hihhhfrhrfirJNRIF@#$%^&*(#$%^ffjfrfiorjoiJDNOIFRFHIO!@#$%^&*((*@#$%^&*#@$%^&*')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_066.png')})
  });

  test('REG_FN_027 - Small + Capital + Special Characters + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_067.png')})
  });

  test('REG_FN_028 - Small + Capital + Special Characters + Numbers greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435joifjrhfiorji@#$%^&*ufhirfhihfii')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_068.png')})
  });

  test('REG_FN_029 - Small + Capital + Special Characters + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435joifjrhfiorji@#$%^&*ufhirfhihfii')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_069.png')})
  });

  test('REG_FN_030 - Small + Capital + Special Characters + Numbers + Empty spaces greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('hihhhfrhrfirJNRIF@#$%^&*(3433435joifjrhfiorji@#$%^&*ufhirfhihfii              ')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_070.png')})
  });

  test('REG_FN_031 - Checking with Emojis',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌🤷‍♀️😎😎😎')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_071.png')})
  });

  test('REG_FN_032 - Emoji length less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌🤷‍♀️😎😎😎😮😁😮😁😮😁😮😮')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_072.png')})
  });

  test('REG_FN_033 - Emoji length Greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌🤷‍♀️😎😎😎😮😁😮😁😮😁😮😮🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐🖐')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_073.png')})
  });

  test('REG_FN_034 - Emoji + Small Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌jbihrfoirfjofoirjforjo')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_074.png')})
  });

  test('REG_FN_035 - Emoji + Capital Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌JHIHIFRJRO')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_075.png')})
  });

  test('REG_FN_036 - Emoji + Capital + Small  Character less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌JHIHIFRJROuifhriuhfu')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_076.png')})
  });

  test('REG_FN_037 - Emoji + Capital Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌KFNROFRFIRJFOFJRJ😎😎😎😎😎😎😎😎😎😎😎😎😎😎')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_077.png')})
  });

  test('REG_FN_038 - Emoji + Capital + Small Character greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌KFNROFRFIRJFJFRNkmkrfjrofro😎')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_078.png')})
  });

  test('REG_FN_039 - Emoji + Capital + Small Character + Numbers greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌KFNROFRFIRJFJFRNkmkrfjrofro😎9404800984038483040')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_079.png')})
  });

  test('REG_FN_040 - Emoji + Capital + Small Character + Numbers less than 50',async()=>{
    await page.reload();
    await expect(page.locator('#firstName')).toBeVisible()
    await page.locator('#firstName').fill('😎✌😎✌🤷‍♀️😎✌KRNkmkrfjrro😎94040')                                           
    await page.screenshot({path:path.join(screenshotDir,'REG_FN_080.png')})
  });

  test.afterAll(async () => {
    if (page) await page.close();
  });
});