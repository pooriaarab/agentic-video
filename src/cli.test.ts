import { describe, expect, test } from "vitest";
import { parseArgs, runCli, type CliIo } from "./cli.js";
const io = (): CliIo & { outLines: string[]; errLines: string[] } => { const outLines: string[] = []; const errLines: string[] = []; return { outLines, errLines, out: (line) => outLines.push(line), err: (line) => errLines.push(line), readFile: () => '{"scenes":[{"duration":5}]}' }; };
describe("cli", () => { test("render defaults to dry run", async () => { const value = io(); expect(await runCli(["render", "--file", "scene.json"], value)).toBe(0); expect(JSON.parse(value.outLines[0]).dryRun).toBe(true); }); test("live parses", () => expect(parseArgs(["render", "--file", "x.json", "--live", "--vendor", "creatomate"])).toMatchObject({ live: true, vendor: "creatomate" })); });
