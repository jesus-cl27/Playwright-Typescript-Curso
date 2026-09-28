import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';

test('purchase an item interceptor', async ({ page }) => {
    await page.on("request", req => {
        console.log(req.url())
    })
    
    await page.goto('https://www.saucedemo.com/')
    
    await page.route(
        "https://www.saucedemo.com/assets/sauce-backpack-1200x1500-CjRW-Djj.jpg",
        (route) => route.abort()
    )
    await page.route(
        "https://www.saucedemo.com/assets/bike-light-1200x1500-DxcZRFOA.jpg",
        (route) => route.abort()
    )
    
    const login = new LoginPage(page)
    await login.loginWithcredentials('standard_user','secret_sauce' )
    await login.checkSuccessfulLogin()

    const itemsContainer = await page.locator('.inventory_item').all()
    await page.screenshot({path: 'screenshots/sauceDemo/itemsNoLoaded.png', fullPage: true})



})
test('All images intercepted', async ({ page }) => {
    await page.on("request", req => {
        console.log(req.url())
    })
    
    await page.goto('https://www.saucedemo.com/')
    
    //para interceptar todas las imagenes de la pagina
    await page.route(
        "**/*.{png,jpg,jpeg,gif,svg}",
        (route) => route.abort()
    )
    
    const login = new LoginPage(page)
    await login.loginWithcredentials('standard_user','secret_sauce' )
    await login.checkSuccessfulLogin()

    const itemsContainer = await page.locator('.inventory_item').all()
    await page.screenshot({path: 'screenshots/sauceDemo/AllItemsNoLoaded.png', fullPage: true})



})