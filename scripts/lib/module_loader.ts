// Tiny ts-node/tsx helper: import module-XX.ts and dump as JSON to stdout.
// Used by script_audit_loop.py to consume module data without needing to parse TS.
//
// Usage: npx tsx scripts/lib/module_loader.ts <module_id_int>
//   e.g. npx tsx scripts/lib/module_loader.ts 11
//
// Output: a single JSON object on stdout (the full Module). Errors to stderr,
// non-zero exit on failure.

const moduleId = parseInt(process.argv[2] ?? "", 10);
if (!Number.isInteger(moduleId) || moduleId < 1 || moduleId > 18) {
  console.error(`module_loader: bad module id ${process.argv[2] ?? "<missing>"}`);
  process.exit(2);
}

const padded = String(moduleId).padStart(2, "0");
const importPath = `../../src/lib/content/modules/module-${padded}`;

(async () => {
  try {
    const mod = await import(importPath);
    const exportName = `MODULE_${moduleId}`;
    const value = (mod as Record<string, unknown>)[exportName];
    if (value === undefined) {
      console.error(`module_loader: ${importPath} has no export ${exportName}`);
      process.exit(3);
    }
    process.stdout.write(JSON.stringify(value));
  } catch (err) {
    console.error(`module_loader: failed to import ${importPath}: ${(err as Error).message}`);
    process.exit(4);
  }
})();
