import { createHash } from "node:crypto";
import type { VideoSpec } from "./types.js";
export function previewId(spec: VideoSpec): string { return `preview_${createHash("sha256").update(JSON.stringify(spec)).digest("hex").slice(0, 16)}`; }
