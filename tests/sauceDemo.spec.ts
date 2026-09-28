import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';

test('Add random item to shopping car', async ({ page }) => {

  // indica el sitio web a probar
  await page.goto('https://www.saucedemo.com/')
  
  //seleccionar un elmento html
  await page.locator('input[id=\'user-name\']').fill('standard_user')
  await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
  await page.screenshot({path: 'screenshots/sauceDemo/loginData.png'})
  await page.getByRole('button', {name:'Login'}).click()

  //para ubicar en que ruta se encuentra
  console.log(await page.url());
  const itemsContainer = await page.locator('.inventory_item').all()
  console.log(itemsContainer.length)
  //elegir un item de forma aleatoria
  const randomIndex = Math.floor(Math.random() * itemsContainer.length)
  const randomItem = itemsContainer[randomIndex]

  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
  const expectedName = await randomItem.locator('.inventory_item_name').innerText()
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

  console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`)
  await randomItem.getByRole('button', {name:'Add to cart'}).click()
  await page.locator('.shopping_cart_link').click()

  await expect(page.locator('.inventory_item_name')).toBeVisible()

  const actualName = await page.locator('.inventory_item_name').innerText()
  const actualDescription = await page.locator('.inventory_item_desc').innerText()
  const actualPrice = await page.locator('.inventory_item_price').innerText()


  //validacion que los datos si correspondan al item
  expect(actualName).toEqual(expectedName)
  expect(actualDescription).toEqual(expectedDescription)
  expect(actualPrice).toEqual(expectedPrice)

  await page.getByRole('button', {name: 'Checkout'}).click()

  await page.getByRole('textbox', {name: 'First Name'}).fill('Juan')
  await page.getByRole('textbox', {name: 'Last Name'}).fill('Mora')
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('70000')
  await page.getByRole('button', {name: 'Continue'}).click()
  //expect(page.getByRole('button', {name: 'Continue'})).toBeVisible()
  const total = await page.locator('.summary_total_label').allInnerTexts()
  console.log('Total is: ', total.toString())
  
  await page.getByRole('button', {name: 'Finish'}).click()
  await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toBeVisible()

});

test('LoginPage Test', async ({ page }) => {
  // indica el sitio web a probar
  await page.goto('https://www.saucedemo.com/')

  
  const login = new LoginPage(page)
  await login.loginWithcredentials('standard_user','secret_sauce' )
  await login.checkSuccessfulLogin()

  //await page.screenshot({path: 'screenshots/sauceDemo/login-successful.png'})

  
 

});

test('Environment Test', async ({ page }) => {
  // indica el sitio web a probar
  //await page.goto(process.env.URL)
  await page.pause()
  const login = new LoginPage(page)
  await login.loginWithcredentials('standard_user','secret_sauce' )
  await login.checkSuccessfulLogin()
 

});