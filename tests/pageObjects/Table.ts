import { expect, Locator, Page } from "@playwright/test"

export class Table {

    private readonly usernameTextbox: Locator
   

    constructor(page: Page){
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
        
        
    }

    async fillUsername(username: string){
       await this.usernameTextbox.fill(username)
    }
}