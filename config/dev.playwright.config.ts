import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from "../playwright.config"
import { EnvConfig } from "../tests/helpers/config-feature"
import path from 'path';

console.log("----RUNING IN DEV ENF----")
export default defineConfig<EnvConfig>({
    ...baseConfig, //
    testDir: path.resolve(process.cwd(), "./tests"),
    use: {
        ...baseConfig.use,
        envName: "dev",
        appURL: "https:www.google.com",
        dbConfig: {
            server: "test",
            dbname: "",
            connectionStr: ""
        }
    }
})