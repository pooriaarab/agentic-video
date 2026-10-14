import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { expect, test } from "vitest";
import { createMcpServer } from "./mcp.js";
test("MCP has render_video and returns dry preview", async () => { const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair(); const server = createMcpServer(); await server.connect(serverTransport); const client = new Client({ name: "test", version: "1" }); await client.connect(clientTransport); try { expect((await client.listTools()).tools.map((tool) => tool.name).sort()).toEqual(["get_cost_report", "render_video"]); const response = await client.callTool({ name: "render_video", arguments: { spec: { scenes: [{ duration: 3 }] } } }); const text = (response as { content: { text: string }[] }).content[0].text; expect(JSON.parse(text)).toMatchObject({ dryRun: true }); } finally { await client.close(); await server.close(); } });
