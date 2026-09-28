import { expect, Locator, Page } from "@playwright/test"

export class LoginPage {

    private readonly usernameTextbox: Locator
    private readonly userpasswordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator

    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
        this.userpasswordTextbox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name:'Login'})
        this.shoppingCartIcon = page.locator('.shopping_cart_link')
        
    }

    async fillUsername(username: string){
       await this.usernameTextbox.fill(username)
    }

    async fillPassword(password: string){
       await this.userpasswordTextbox.fill(password)
    }

    async clickOnLoginButton(){
       await this.loginButton.click()
    }

    async loginWithcredentials(username: string, password: string){
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnLoginButton()
    }
    //asercion
    async checkSuccessfulLogin(){
        await expect(this.shoppingCartIcon).toBeVisible()
    }

}