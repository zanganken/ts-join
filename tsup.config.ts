import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/array-join.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
});
