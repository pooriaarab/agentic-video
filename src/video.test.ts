import { describe, expect, test } from "vitest";
import { renderVideo, validateSceneSpec } from "./video.js";

describe("renderVideo", () => {
  const spec = { scenes: [{ duration: 8 }, { duration: 12 }] };
  test("defaults to a dry preview", async () => {
    const receipt = await renderVideo({ spec });
    expect(receipt).toMatchObject({ vendor: "shotstack", dryRun: true, scenes: 2, duration: 20 });
    expect(receipt.renderId).toMatch(/^preview_/);
  });
  test("rejects invalid scene specs", () => expect(() => validateSceneSpec({ scenes: [{ duration: 0 }] })).toThrow("positive duration"));
  test("requires a key before a live vendor request", async () => {
    await expect(renderVideo({ spec, live: true, vendor: "shotstack", apiKey: "" })).rejects.toThrow("SHOTSTACK_API_KEY");
  });
  test("preserves vendor error bodies", async () => {
    await expect(renderVideo({ spec, live: true, vendor: "creatomate", apiKey: "test", fetchFn: async () => new Response("quota exceeded", { status: 429 }) })).rejects.toThrow("quota exceeded");
  });
});
