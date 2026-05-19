import { test, expect } from "@playwright/test"
import { log } from "../helpers/logger"
import HomePage from "../page-objects/noopcommercer.home.page"
import dotenv from "dotenv";
dotenv.config();

test("Login to Nopcommerce WEB App", { tag: "@endtoend" }, async ({ page }, testInfo) => {
    //Create env
    const envConf = testInfo.project.use as any;
    // create an page object
    const homePage = new HomePage(page);

    const username = process.env.NOP_COMMERCE_TEST_USERNAME!;
    const password = process.env.NOP_COMMERCE_TEST_PASSWORD!;

    await homePage.loginTonopCommerceWeb(envConf.nopCommerceWeb, username, password);
})