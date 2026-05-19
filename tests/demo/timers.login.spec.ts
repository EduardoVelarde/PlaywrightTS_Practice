import { test, expect } from '@playwright/test';

test.describe("Login Functionality", () => {
  test.beforeEach("Go to the login page", async ({ page }) => {
    //Launch URL
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
    await page.getByRole('link', { name: 'Make Appointment' }).click();

  })
  test('Should Login Succesfully', { tag: "@timers" }, async ({ page }) => {
    await expect(page.locator('#login')).toContainText('Please login to make appointment.');
    await expect(page.getByLabel('Username')).toBeEmpty();
    let userNameEle = page.getByLabel('Username');
    await userNameEle.check();
    /*await page.getByLabel('Username').fill('John Doe');
    await page.getByLabel('Password').dblclick();
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();*/
    //Next screen assert
    //await expect(page.locator('h2')).toContainText('Make Appointment');
  });

  test('Should Prevent Login with incorrect creds', { tag: "@smoke" }, async ({ page }) => {

    await expect(page.locator('#login')).toContainText('Please login to make appointment.');
    await expect(page.getByLabel('Username')).toBeEmpty();
    await page.getByLabel('Username').click();
    await page.getByLabel('Username').fill('John Smith');
    await page.getByLabel('Password').dblclick();
    await page.getByLabel('Password').fill('ThisIsNotAPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    //Next screen assert
    await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
  });
})

