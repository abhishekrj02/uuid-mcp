#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from 'zod/v4';

// Create server instance
const server = new McpServer({
    name: "shift-lite",
    version: "1.0.0",
});


// helper
async function callBackendAPI(endpoint: string, data?: any) {
    try {
        const response = await fetch(`http://127.0.0.1:9000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data || {}),
        });
        
        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error calling ${endpoint}:`, error);
        throw error;
    }
}

// Tools:
// Blast radius
server.registerTool(
    "blast_radius",
    {
        description: "Analyzes the blast radius of a file or component - shows what would be affected if this file were modified or deleted",
        inputSchema: z.object({
            file_path: z.string().meta({description: "Path to the file to summarize"}),
            project_path: z.string().meta({description: "Path to the root of the project"}),
        })
    },
    async (args: any) => {
        const data = await callBackendAPI('/api/blast-radius', {
            file_path: args.file_path,
            project_path: args.project_path,
        });
        
        return {
            content: [
                { 
                    type: "text", 
                    text: JSON.stringify(data, null, 2)
                },
            ],
        };
    },
);

// Dependencies
server.registerTool(
    "dependencies",
    {
        description: "Retrieves all dependencies for a given file or component, including direct and transitive dependencies",
        inputSchema: z.object({
            file_path: z.string().meta({description: "Path to the file to summarize"}),
            project_path: z.string().meta({description: "Path to the root of the project"}),
        })
    },
    async (args: any) => {
        const data = await callBackendAPI('/api/dependencies', {
            file_path: args.file_path,
            project_path: args.project_path,
            depth: args.depth || 3,
        });
        
        return {
            content: [
                { 
                    type: "text", 
                    text: JSON.stringify(data, null, 2)
                },
            ],
        };
    },
);

// File summary
server.registerTool(
    "file_summary",
    {
        description: "Generates a comprehensive summary of a file including its purpose, exports, imports, and key functions",
        inputSchema: z.object({
            file_path: z.string().meta({description: "Path to the file to summarize"}),
            project_path: z.string().meta({description: "Path to the root of the project"}),
        })
    },
    async (args: any) => {
        const data = await callBackendAPI('/api/file-summary', {
            file_path: args.file_path,
            project_path: args.project_path,
        });
        
        return {
            content: [
                { 
                    type: "text", 
                    text: JSON.stringify(data, null, 2)
                },
            ],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Shift-lite MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
