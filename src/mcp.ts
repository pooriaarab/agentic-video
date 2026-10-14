import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getCostReport, GuardError, VendorError } from "agentic-core";
import { renderVideo } from "./video.js";
import { DEFAULT_BRAND } from "./index.js";
const result = (value: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(value) }] });
export function createMcpServer(): McpServer { const server = new McpServer({ name: DEFAULT_BRAND.command, version: DEFAULT_BRAND.version }); server.registerTool("render_video", { description: "Render a long video from a scene spec. Preview is the default; set live true to call a vendor.", inputSchema: { spec: z.object({ scenes: z.array(z.object({ duration: z.number().positive(), background: z.string().optional(), elements: z.array(z.unknown()).optional() })).min(1), output: z.object({ format: z.enum(["mp4", "webm"]).optional(), resolution: z.string().optional() }).optional() }), vendor: z.enum(["shotstack", "creatomate"]).default("shotstack"), live: z.boolean().default(false) }, annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true } }, async (input) => { try { return result(await renderVideo(input)); } catch (error) { if (error instanceof GuardError || error instanceof VendorError) return { ...result({ error: error.message }), isError: true }; throw error; } }); server.registerTool("get_cost_report", { description: "Read session cost totals.", inputSchema: {}, annotations: { readOnlyHint: true } }, async () => result(getCostReport())); return server; }
export async function startMcp(): Promise<void> { await createMcpServer().connect(new StdioServerTransport()); }
