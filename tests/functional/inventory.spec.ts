/**
 * 
 * Login as Standart user
 * Get a list  of products with its price
 * Assert that  all Products have non-zero dollar values
 */
import { test, expect } from '@playwright/test';
test.describe("Invenrtory feature", () => {
    test.beforeEach("Login with valid creds", async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //Assert
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveURL(/.*\inventory/);
    });

    test("Should confirm  all prices are non zero values", { tag: "@inventory" }, async ({ page }) => {
        let productsElm = await page.locator(".inventory_item");
        await expect(productsElm).toHaveCount(6);

        let totalProducts = await productsElm.count();
        let priceArr = []
        for (let i = 0; i < totalProducts; i++) {
            let eleNode = productsElm.nth(i);

            let productName = await eleNode.locator(".inventory_item_name").innerText();

            let productPrice = await eleNode.locator(".inventory_item_price").innerText();

            console.log(`Product: ${productName}, price: ${productPrice}`)
            priceArr.push(productPrice);
        }

        console.log(`Original Price Array ${priceArr}`);

        /**
         * remove the $ into ""
         * price should be >o   
         */
        let priceArrNum = priceArr.map((item) => parseFloat(item.replace("$", "")));
        console.log(`>> Modified arr: ${priceArrNum}`)

        let pricerArrWithInvalidVals = priceArrNum.filter((item) => item <= 0);

        if (pricerArrWithInvalidVals.length > 0) {
            console.log(`>> ERROR: Zero price value found: ${pricerArrWithInvalidVals}`);
        } else {
            console.log(`>> All prices are non-zero values`);
        }
        expect(pricerArrWithInvalidVals).toHaveLength(0);
    })
})


