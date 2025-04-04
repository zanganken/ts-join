import * as fs from "fs/promises";
import * as path from "path";

const entrypointDir = path.join(__dirname, "../", "src");
const distDir = path.join(__dirname, "../", "dist");

const [, , ...options] = process.argv;

const run = async () => {
  try {
    if (options.includes("--clean"))
      await fs.rm(distDir, { force: true, recursive: true });
    await fs.mkdir(distDir);
  } catch (e) {}

  const entrypoints = await fs.readdir(entrypointDir);

  for (const entrypoint of entrypoints) {
    if (!entrypoint.endsWith(".d.ts")) continue;

    const entrypointBase = entrypoint.replace(".d.ts", "");

    await Promise.all([
      fs.writeFile(path.join(distDir, `${entrypointBase}.js`), ""),
      fs.writeFile(path.join(distDir, `${entrypointBase}.mjs`), ""),
      fs.copyFile(
        path.join(entrypointDir, entrypoint),
        path.join(distDir, `${entrypointBase}.d.ts`)
      ),
      fs.copyFile(
        path.join(entrypointDir, entrypoint),
        path.join(distDir, `${entrypointBase}.d.mts`)
      ),
    ]);
  }
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
