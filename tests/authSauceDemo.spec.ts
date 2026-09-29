import {test } from "@playwright/test"

//Prueba de autenticación para SauceDemo, utilizando un archivo con la información 
// de autenticación previamente guardada.
test("Get inventory items with authentication setup", async ({ page }) => {

    /** Abre el inventario directamente y muestra en consola el texto de cada producto. */
    await page.goto('https://www.saucedemo.com/inventory.html')
    const itemsContainer = await page.locator('.inventory_item').all()
    
    for (let container of itemsContainer) {
        console.log(await container.allInnerTexts())
    }
})
