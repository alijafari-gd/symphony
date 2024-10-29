import path from "path";
import fs from "fs-extra";
import { Paths } from "../helpers/paths";

const APP_BUILD_TYPE = process.env.APP_BUILD_TYPE ?? "release";
const APP_VERSION_NAME = process.env.APP_VERSION_NAME;

const main = async () => {
    if (typeof APP_VERSION_NAME !== "string") {
        throw new Error("Missing environment variable: APP_VERSION_NAME");
    }
    const apk = [
        path.join(
            Paths.appDir,
            `build/outputs/apk/${APP_BUILD_TYPE}/app-${APP_BUILD_TYPE}.apk`,
        ),
        path.join(Paths.distDir, `symphony-v${APP_VERSION_NAME}.apk`),
    ] as const;
    const aab = [
        path.join(
            Paths.appDir,
            `build/outputs/bundle/${APP_BUILD_TYPE}/app-${APP_BUILD_TYPE}.aab`,
        ),
        path.join(Paths.distDir, `symphony-v${APP_VERSION_NAME}.aab`),
    ] as const;
    await fs.ensureDir(Paths.distDir);
    await fs.move(apk[0], apk[1]);
    console.log(`Moved apk to "${apk[1]}".`);
    await fs.move(aab[0], aab[1]);
    console.log(`Moved aab to "${aab[1]}".`);
};

main();