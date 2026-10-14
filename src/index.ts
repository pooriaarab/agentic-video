export { VERSION } from "./version.js";
export { renderVideo, createVideoGuards, validateSceneSpec, videoDuration, GuardError, VendorError } from "./video.js";
export type { RenderRequest, RenderReceipt, VideoSpec, VideoVendor, Scene } from "./video.js";
export { ShotstackAdapter } from "./adapters/shotstack.js";
export { CreatomateAdapter } from "./adapters/creatomate.js";
import { defineBrand, type BrandConfig } from "agentic-core";
import { VERSION } from "./version.js";
export const DEFAULT_BRAND: BrandConfig = defineBrand({ name: "Agentic video", command: "agentic-video", description: "Render long videos from scene specs across vendors.", keywords: ["video", "render", "shotstack", "creatomate", "cli", "mcp"], version: VERSION });
