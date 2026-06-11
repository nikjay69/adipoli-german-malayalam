import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // The codebase-wide `setMounted(true)`-in-effect hydration idiom trips
      // this rule in ~20 legacy pages (games/auth) that are frozen for the MVP.
      // Keep it visible as a warning; new code should still avoid it.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
