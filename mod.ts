export default async function initImportMap(
  denoJsonPath = "./deno.json",
  importMapPath = "./import_map.json"
) {
  const content = await Deno.readTextFile(denoJsonPath).catch(
    async (_error) => {
      if (denoJsonPath === "./deno.json") {
        denoJsonPath = "deno.jsonc";
        try {
          return await Deno.readTextFile("deno.jsonc").catch();
        } catch (_error) {
          return;
        }
      }
    }
  );

  if (typeof content !== "string") {
    console.log(
      `%cfresh_import_map (plugin):%c No such file or directory: '${denoJsonPath}'`,
      "color: red",
      "color: white"
    );
    return;
  }

  try {
    const json = JSON.parse(content);

    if (!(json instanceof Object) || json instanceof Array) {
      console.log(
        `%cfresh_import_map (plugin):%c Invalid '${denoJsonPath}' format.`,
        "color: red",
        "color: white"
      );
      return;
    }

    const imports = json.imports;

    if (!imports) {
      await Deno.writeTextFile(importMapPath, JSON.stringify({}));
      return;
    }
    if (!(imports instanceof Object) || imports instanceof Array) {
      console.log(
        `%cfresh_import_map (plugin):%c Invalid imports format in '${denoJsonPath}'. Must be an object`,
        "color: red",
        "color: white"
      );
      return;
    }

    await Deno.writeTextFile(importMapPath, JSON.stringify({ imports }));
  } catch (error) {
    console.log(
      `%cfresh_import_map (plugin):%c Failed to read '${denoJsonPath}'.\n ${error}`,
      "color: red",
      "color: white"
    );
    return;
  }
}
