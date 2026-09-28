import { test, expect } from '@playwright/test';


test('test 3', async ({ page }) => {

  // indica el sitio web a probar
  await page.goto('https://www.mercadolibre.com.co')
  console.log(await page.evaluate(() => navigator.webdriver));
  
  //seleccionar un elmento html
  await page.locator('input[id=\'cb1-edit\']').fill('lenovo')

  await page.keyboard.press('Enter')
  //await page.pause()

  await expect(page.locator('ol.ui-search-layout')).toBeVisible()
  await page.pause()
  
  
  const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li[contains(@class, \'ui-search-layout__item\')]//h3').allInnerTexts()
  console.log('Total items: ', titles.length)
  
  for(let title of titles){
    console.log('The title is: ', title)
  }
  
});

test('test 4', async ({ page }) => {
  await page.goto('https://www.mercadolibre.co.cr')
  //localizar elementos por rol en accesibilidad

  await page.getByRole('link', {name: 'Historial'}).click()

  await page.pause()

});

