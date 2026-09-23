import { Config } from "@remotion/cli/config";

Config.setEntryPoint("./src/index.ts");
Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE ?? "/usr/local/bin/google-chrome");
