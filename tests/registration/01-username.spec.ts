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
    await page.locator('#username').fill('    ')
    await page.screenshot({path:path.join(screenshotDir, 'REG_001.png')});
  });

  test('REG_002 - Blank Inputs of length 10',async()=>{
    await page.reload();
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('           ')
    await page.screenshot({path:path.join(screenshotDir,'REG_002.png')});
  });

  test('REG_003 - Blank Inputs of length greater than 25 (30)',async()=>{
    await page.reload();
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('                                   ')
    await page.screenshot({path:path.join(screenshotDir,'REG_003.png')});
  });

  test('REG_004 - Small Charcter with length less than 2',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator("#username").fill('d')
    await page.screenshot({path:path.join(screenshotDir,'REG_004.png')})
  });

  test('REG_005 - Small Character length > 10 and lesser than 20',async()=>{
    await page.reload();
    await expect(page.locator("#username")).toBeVisible();
    await page.locator("#username").fill('sdertuyifndkednges')
    await page.screenshot({path:path.join(screenshotDir,'REG_005.png')});
  });

  test('REG_006 - Small Character length Greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jhguedggdejvivintntgvjbthgbtjbgjhbgjhtbgjhbgjthgbjthbhtbtjhgbthjgvtjhg')
    await page.screenshot({path:path.join(screenshotDir,'REG_006.png')})
  });

  test('REG_007 - Blank + Small Characters length > 10',async()=>{
    await page.reload();
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('     jhfurfurfurhfrfuhrf')
    await page.screenshot({path:path.join(screenshotDir,'REG_007.png')})
  })

  test('REG_008 - Small Character + Blank Spaces length greater than 50',async()=>{
    await page.reload();
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jkhfrihfiffuirfhuirhf     hfiuhriufhirufhurhfirhfu   uifhiurhfuirhfurhf')
    await page.screenshot({path:path.join(screenshotDir,'REG_008.png')})
  });

  test('REG_009 - Capital Characters at the length of 10',async()=>{
    await page.reload();
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('ABCDEFGHIJK')
    await page.screenshot({path:path.join(screenshotDir,'REG_009.png')})

  });

  test('REG_010 - Capital Character with the Greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('JFIRHFUIHRIUFHRIUFIJRBIJIJDJDOIRJFIJRFIRIFHIRUHFIRHFIRIFRIFHRIHFIJRHFI')
    await page.screenshot({path:path.join(screenshotDir,'REG_010.png')})
  });

  test('REG_011 - Empty Spaces + Capital Characters less than 10',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('    FJFJRJE')
    await page.screenshot({path:path.join(screenshotDir,'REG_011.png')})
  });

  test('REG_012 - Small + Capital Character Greater than 20',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('hiuhfuihhfihfuriJNRFCRJFIRJFIRJFJRFIJROIFJRIOFJ')
    await page.screenshot({path:path.join(screenshotDir,'REG_012.png')})
  });

  test('REG_013 - Small + Capital Character + Empty Spaces Length less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('nfrnfirfriorjNINFIRJFROIFJROIFJROF         ijfirjfrjfiJFROIFJROJFORIJFJ      ')
    await page.screenshot({path:path.join(screenshotDir,'REG_013.png')})
  });

  test('REG_014 - Numbers less than 10',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('5363723489')
    await page.screenshot({path:path.join(screenshotDir,'REG_014.png')})
  });

  test('REG_015 - Number Greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('5363723489638389879793839983987899874676829802827382762637')
    await page.screenshot({path:path.join(screenshotDir,'REG_015.png')})
  });

  test('REG_016 - Small Character + Numbers length greater than 20 and less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('578387839783jiurihfrhfhr832iufijrf')
    await page.screenshot({path:path.join(screenshotDir,'REG_016.png')})
  });

  test('REG_017 - Small Character + Numbers length Greater than 50',async()=>{
    await page.reload()
    await page.waitForTimeout(4000)
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(4000)
    await page.locator('#username').fill('jfirnfijfir873987978jfhvijvhnfih398ue983787398eehih99u398ubfgfy487r478ry4urh4uyr7y4r4rug48yr478yr')
    await page.screenshot({path:path.join(screenshotDir,'REG_017.png')})
  });

  test('REG_018 - Small + Capital Character + Numbers length less than 50',async()=>{
    await page.reload()
    await page.waitForTimeout(4000)
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(4000)
    await page.locator('#username').fill('jfiruihfurfhKJFNRIFRI8974934934890')
    await page.screenshot({path:path.join(screenshotDir,'REG_018.png')})
  });

  test('REG_019 - Small + Capital Character + Numbers + Empty spaces length 49',async()=>{
    await page.reload()
    await page.waitForTimeout(4000)
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(4000)
    await page.locator('#username').fill('jfiruihfurfhKJFNRIFRI8974934934890             JIRFNIRF      ejijeiujdie')
    await page.screenshot({path:path.join(screenshotDir,'REG_019.png')})
  });

  test('REG_020 - Accepts the Special Characters or Not',async()=>{
    await page.reload()
    await page.waitForTimeout(4000)
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(4000)
    await page.locator('#username').fill('#$%^&')
    await page.screenshot({path:path.join(screenshotDir,'REG_020.png')})
  });

  test('REG_021 - Special Character length Greater than 20 and less than 50',async()=>{
    await page.reload()
    await page.waitForTimeout(4000)
    await expect(page.locator('#username')).toBeVisible();
    await page.waitForTimeout(4000)
    await page.locator('#username').fill('#$%^&$^&&&^^$$#@$#!$$&*((^&&$^&^^$')
    await page.screenshot({path:path.join(screenshotDir,'REG_021.png')})
  });

  test('REG_022 - Special Character length greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('#$%^&$^&&&^^$$#@$#!$$&*((^&&$^&^^$#$^&*(*&^#@#$%^&*(*&^#$^&*(*#@#$^&*##$^&')
    await page.screenshot({path:path.join(screenshotDir,'REG_022.png')})
  });

  test('REG_023 - Small + Special Character length =10',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('ihir!@#$%^')
    await page.screenshot({path:path.join(screenshotDir,'REG_023.png')})
  });

  test('REG_024 - Small + Special Character length greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jijrrjfjfjfrfoijoiijo@#$%^&*()(*&^$#@W#E$^&*&^$^&jvfuhvuhfh@#$%^&*(*&^$^&*')
    await page.screenshot({path:path.join(screenshotDir,'REG_024.png')})
  });

  test('REG_025 - Small + Capital + Special Character less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jijrrjfjfjfrfoIFIRHFUHFRH#$%^&*&#$^&*')
    await page.screenshot({path:path.join(screenshotDir,'REG_025.png')})
  });

  test('REG_026 - Small + Capital + Special Character Greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jijrrjfjfjfrfoIFIRHFUHFRH#$%^&*&#$^&*hiuhriuhuifhKJFOIJRJ@#$%^&*(*^$^&*&^$')
    await page.screenshot({path:path.join(screenshotDir,'REG_026.png')})
  });

  test('REG_027 - Small + Capital + Special Character + Numbers less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jijrrjfjfHDBIEDHUIE@#$%^&234')
    await page.screenshot({path:path.join(screenshotDir,'REG_027.png')})
  });

  test('REG_028 - Small + Capital + Special Character + Numbers Greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jijrrjfjfHDBIEDHUIE@#$%^&234kjfhriufhri@#$^&*JOIRFIRFNIRJFRFJOIJ@#$%^&*(IUJRFRFUJ')
    await page.screenshot({path:path.join(screenshotDir,'REG_028.png')})
  });

  test('REG_029 - Small + Capital + Special Character + Numbers + Empty spaces less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jijrrjfjfHDBIEDHUIE@#$%^&234kjfhriufhri@#           ')
    await page.screenshot({path:path.join(screenshotDir,'REG_029.png')})
  });

  test('REG_030 - Small + Capital + Special Character + Numbers + Empty spaces Greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('jijrrjfjfHDBIEDHUIE@#$%^&234kjfhriufhri@#  irfhurfhurhf  jfiorji@#$%^&*()         ')
    await page.screenshot({path:path.join(screenshotDir,'REG_030.png')})
  });

  test('REG_031 - Input accepts the Emojis',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁')
    await page.screenshot({path:path.join(screenshotDir,'REG_031.png')})
  });

  test('REG_032 - Emojis length less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍😘🤷‍♂️🤷‍♂️🤣🏆🏆🤣😅😆😆😆😆😆😆😆')
    await page.screenshot({path:path.join(screenshotDir,'REG_032.png')})
  });

  test('REG_033 - Emojis length greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍😘🤷‍♂️🤷‍♂️🤣🏆🏆🤣😅😆🙌😂🏏🏏🏏🏏🏏🏏🏏🏏🏏🏏🏏😂😂😂🔥🔥🔥🔥🔥💔💔👍😉😉😉😆😆😆😆😆😆')
    await page.screenshot({path:path.join(screenshotDir,'REG_033.png')})
  });

  test('REG_034 - Emojis + small Character less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍😘🤷‍♂️jefihehefhifrifoi')
    await page.screenshot({path:path.join(screenshotDir,'REG_034.png')})
  });

  test('REG_035 - Emojis + Capital Character less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍AJNJFNNRFIRJFINRFN')
    await page.screenshot({path:path.join(screenshotDir,'REG_035.png')})
  });

  test('REG_036 - Emojis + Capital + Small Character less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍😘🤷‍♂️jefihehefhifrifoiKRNFOIRFJIORFJRFRFRFOJIRJFIORJFI')
    await page.screenshot({path:path.join(screenshotDir,'REG_036.png')})
  });

  test('REG_037 - Emojis + Capital Character greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍😘😅😒🏆😒🏆😒🏆🤣🏆😒🚗🚗🚗😒👌🔥🔥🔥🔥🔥🔥🔥🤷‍♂️jefihehefhifrifoiKRNFOIRFJIORFJRFRFRFOJIRJFIORJFI')
    await page.screenshot({path:path.join(screenshotDir,'REG_037.png')})
  });

  test('REG_038 - Emojis + Capital + Small Character greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍😘😅😒🏆😒🏆😒🏆🤣🏆😒🚗🚗🚗😒👌🔥🔥🔥🔥nfjrfirjforjifjroi🔥🔥🔥🤷‍♂️jefihehefhifrifoiKRNFOIRFJIORFJRFRFRFOJIRJFIORJFI')
    await page.screenshot({path:path.join(screenshotDir,'REG_038.png')})
  });

  test('REG_039 - Emojis + Capital + Small Character + Numbers greater than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍😁😍😍😘😅😒🏆😒🏆😒🏆🤣🏆😒🚗🚗🚗😒👌🔥🔥🔥🔥nfjrfirjforjifjroi234484848484foiKRNFOIRFJIORFJRFRFRFOJIRJFIORJFI')
    await page.screenshot({path:path.join(screenshotDir,'REG_039.png')})
  });

  test('REG_040 - Emojis + Capital + Small Character + Numbers less than 50',async()=>{
    await page.reload()
    await expect(page.locator('#username')).toBeVisible();
    await page.locator('#username').fill('😮😮👍nfjrfi23484foiKRNFFOJIRJFIORJFI')
    await page.screenshot({path:path.join(screenshotDir,'REG_040.png')})
});

  test.afterAll(async () => {
    if(page){
      await page.close();
    }
  });
});
