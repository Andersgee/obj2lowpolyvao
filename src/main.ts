import { parse } from "https://deno.land/std@0.152.0/flags/mod.ts";
import { parseobj } from "./parseobj.ts";

async function main(infile: string, outfile: string) {
  const text = await Deno.readTextFile(infile);
  const result = parseobj(text);
  await Deno.writeTextFile(outfile, JSON.stringify(result));
  console.log(`Done. Saved to ${outfile}`);
}

const flags = parse(Deno.args, {
  string: ["f", "o"],
});

if (flags.f && flags.o) {
  try {
    main(flags.f, flags.o);
  } catch (err) {
    console.error(err);
  }
} else {
  console.log("example usage:");
  console.log("deno run src/main.ts");
}
