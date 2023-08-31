# fresh_import_map

This is a small plugin for **[Fresh](https://fresh.deno.dev/)** that automatically 
generates an **import_map.json** file from a **deno.json** file.

## Usage

To add this plugin to your **Fresh** project, just add the following line into
your `dev.ts` file.

```diff
#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";

+ import "https://deno.land/x/fresh_import_map@v1.0.0/load.ts";

await dev(import.meta.url, "./main.ts");
```

This will automatically generate a `import_map.json` file based on your
`deno.json` or `deno.jsonc` file.
