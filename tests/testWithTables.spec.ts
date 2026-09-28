import { test, expect, Page } from '@playwright/test';

test('test web table', async ({ page }, testInfo) => {
  // Navega a la página que contiene la tabla HTML
  await page.goto('https://www.w3schools.com/html/html_tables.asp');
  //await page.pause();
  // Busca la tabla por su id "customers"
  const table = page.locator('#customers');

  // Selecciona únicamente las filas que realmente contienen celdas de datos.
  // La primera fila es el encabezado y no debe procesarse como un cliente.
  const rows = table.locator('tr').filter({ has: page.locator('td') });

  // Adjunta una captura de pantalla de la tabla al informe de prueba
  await testInfo.attach('Table view', {
    body: await page.screenshot(),
    contentType: 'image/png',
  });

  // Muestra la cantidad total de filas de datos
  const totalRows = await rows.count();
  console.log('Total rows: ', totalRows);

  const customers: Customer[] = [];

  for (let i = 0; i < totalRows; i++) {
    const row = rows.nth(i);
    let customer: Customer = {
      company: await row.locator('td').nth(0).innerText(),
      contact: await row.locator('td').nth(1).innerText(),
      country: await row.locator('td').nth(2).innerText()
    };
    customers.push(customer);
  }
  getTableData(customers, 'Canada');
  //for (let customer of customers) {
  //  console.log(customer);
  //}

});

interface Customer {
  company: string
  contact: string
  country: string
}

/**
 * Filtra los clientes por país y muestra cuántos coinciden con el criterio.
 * @param customers Clientes extraídos de la tabla HTML.
 * @param tableSelector País que se utilizará como filtro.
 */
async function getTableData(customers: Customer[], tableSelector: string) {
  const rowsFiltered = customers.filter((customer) => customer.country === tableSelector);
  console.log(`Total rows for ${tableSelector}: `, rowsFiltered.length);

}
