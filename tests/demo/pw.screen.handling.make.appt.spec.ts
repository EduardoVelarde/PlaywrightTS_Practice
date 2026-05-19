import { test, expect } from '@playwright/test';

test.describe("Make Appoinment", () => {

    test.beforeEach("Login with valids creeds", async ({ page }, testinfo) => {
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await expect(page).toHaveTitle("CURA Healthcare Service");
        await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
        await page.getByRole('link', { name: 'Make Appointment' }).click();

        await expect(page.locator('#login')).toContainText('Please login to make appointment.');
        await expect(page.getByLabel('Username')).toBeEmpty();
        await page.getByLabel('Username').click();
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').dblclick();
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();

        let fullPage = await page.screenshot({ fullPage: true });
        testinfo.attach("Login Page", { body: fullPage, contentType: "image/png" });
        //Next screen assert
        await expect(page.locator('h2')).toContainText('Make Appointment');
    })

    test('Shoulld make an appoiintment with no default', { tag: "@screenshot" }, async ({ page }) => {
        await expect(page.getByLabel('Facility')).toHaveValue('Tokyo CURA Healthcare Center');
        await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
        await page.getByLabel('Facility').selectOption({ label: "Seoul CURA Healthcare Center" });
        await page.getByLabel('Facility').selectOption({ index: 0 });

        let dropdownOptionsEl = page.getByLabel('Facility').locator('option');
        await expect(dropdownOptionsEl).toHaveCount(3);

        //Get all the valus from the dropdown 
        let listOfOptions = await page.getByLabel('Facility').all();
        let arrOfOptions = [];
        for (let ele of listOfOptions) {
            let eleText = await ele.textContent();
            if (eleText) {
                arrOfOptions.push(eleText);
            }

        }
        console.log(`>> List of options: ${arrOfOptions}`);

        await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
        //Radio Button 
        await page.getByRole('radio', { name: 'Medicaid' }).check();
        await page.locator('.input-group-addon').click();
        // Calendar
        await page.getByRole('cell', { name: '27' }).nth(1).click();
        await page.getByRole('cell', { name: '27' }).nth(1).click();
        await page.getByRole('cell', { name: '29' }).nth(1).click();
        await page.getByRole('cell', { name: '28' }).nth(1).click();
        await page.locator('form div').filter({ hasText: 'Visit Date (Required)' }).click();
        await page.locator('form div').filter({ hasText: 'Comment' }).click();

        await page.getByRole('textbox', { name: 'Comment' }).click();
        await page.getByRole('textbox', { name: 'Comment' }).fill('This is a multi-line columns capture by Playwirght codegen');
        await page.getByRole('button', { name: 'Book Appointment' }).click();
        await expect(page.locator('h2')).toContainText('Appointment Confirmation');
        await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
    });
})

