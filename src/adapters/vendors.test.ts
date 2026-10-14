import { describe, expect, test } from "vitest";
import { CreatomateAdapter } from "./creatomate.js";
import { ShotstackAdapter } from "./shotstack.js";
import type { VideoSpec } from "./types.js";

const spec: VideoSpec = { scenes: [{ duration: 10 }] };

describe("live vendor adapters", () => {
  test("Shotstack calls its HTTPS render host with injected fetch", async () => {
    let url = "";
    const fetchFn: typeof fetch = async (input) => {
      url = String(input);
      return new Response(JSON.stringify({ response: { id: "shotstack-render" } }), { status: 200 });
    };
    await expect(new ShotstackAdapter().render(spec, { apiKey: "test", fetchFn })).resolves.toBe("shotstack-render");
    expect(url).toBe("https://api.shotstack.io/stage/render");
  });

  test("Creatomate calls its HTTPS render host with injected fetch", async () => {
    let url = "";
    const fetchFn: typeof fetch = async (input) => {
      url = String(input);
      return new Response(JSON.stringify({ id: "creatomate-render" }), { status: 200 });
    };
    await expect(new CreatomateAdapter().render(spec, { apiKey: "test", fetchFn })).resolves.toBe("creatomate-render");
    expect(url).toBe("https://api.creatomate.com/v1/renders");
  });
});
