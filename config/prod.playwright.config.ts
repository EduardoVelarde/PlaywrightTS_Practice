import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config"
import { EnvConfig } from "../tests/helpers/config-feature"
import path from 'path';

console.log("----RUNING IN PROD ENV----")
export default defineConfig<EnvConfig>({
    ...baseConfig, //
    testDir: path.resolve(process.cwd(), "./tests"),
    use: {
        ...baseConfig.use,
        envName: "prod",
        appURL: "https://katalon-demo-cura.herokuapp.com/",
        dbConfig: {
            server: "test",
            dbname: "",
            connectionStr: ""
        }
    }
})