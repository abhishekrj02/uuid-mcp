import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { randomUUID } from "crypto";

// Create server instance
const server = new McpServer({
    name: "uuid-mcp",
    version: "1.0.0",
});

// Register UUID tools
server.registerTool(
    "generate_uuid",
    {
        description: "Generates a random UUID (Universally Unique Identifier)",
    },
    async () => {
        return {
            content: [
                { type: "text", text: `Generated UUID: ${randomUUID()}` },
            ],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("UUID Generator MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
