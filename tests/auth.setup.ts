import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "./pageObjects/LoginPage";

/** Prepara y persiste una sesión autenticada de SauceDemo para las pruebas. */
const authFile = 'playwright/.auth/user.json';

setup("authenticate",async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    const login = new LoginPage(page)
    await login.loginWithcredentials('standard_user','secret_sauce' )
    await login.checkSuccessfulLogin()

    // Guarda cookies y almacenamiento local para restaurar la sesión en otros tests.
    await page.context().storageState({ path: authFile });
})