import test from "@playwright/test"
import { LoginPage } from "./pageObjects/LoginPage"

test('Books interceptor', async ({ page }) => {
   
    
    //para interceptar una peticion especifica y devolver un json con datos falsos
    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: //se modifica el libro que se muestra en la pagina con un json falso
                    `
                    {
                        "books": [
                            {
                                "isbn": "9781449325862",
                                "title": "Jesus's Unknown Book",
                
                                "subTitle": "A Working Introduction",
                                "author": "Richard E. Silverman",
                                "publish_date": "2020-06-04T08:48:39.000Z",
                                "publisher": "O'Reilly Media",
                                "pages": 201,
                                "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                                "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                            }
                        ]
                    }
                
                    `
                }
            )
            
        }
    )
    await page.goto('https://demoqa.com/books')
    await page.screenshot({ path: 'screenshots/demoqa/booksInterceptor.png' })
    await page.pause()
    
    


})