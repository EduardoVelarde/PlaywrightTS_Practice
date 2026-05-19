import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config"
import { EnvConfig } from "../tests/helpers/config-feature"
import path from 'path';

console.log("----RUNING IN TEST ENF----")
export default defineConfig<EnvConfig>({
    ...baseConfig, //
    testDir: path.resolve(process.cwd(), "./tests"),
    use: {
        ...baseConfig.use,
        envName: "test",
        appURL: "https://katalon-demo-cura.herokuapp.com/",
        nopCommerceWeb: "https://admin-demo.nopcommerce.com/login",
        dbConfig: {
            server: "test",
            dbname: "",
            connectionStr: ""
        }
    }
})