# uuid-mcp

A minimal UUID utility server built for the Model Context Protocol (MCP). Generate UUIDs seamlessly through Claude Desktop and Claude Code.

Claude talks to it over stdio, gets a UUID, done.

## Features

- 🆔 Generate random UUIDs (v4)
- 🔌 Easy integration with Claude Desktop and Claude Code
- ⚡ Lightweight and fast
- 🛠️ Built with TypeScript

## Installation

### Option 1: Install globally (simple, persistent)

```bash
npm install -g uuid-mcp
```

Verify it works:
```bash
uuid-mcp
```

You should see:
```bash
UUID Generator MCP Server running on stdio
```

If you don’t, stop. Your install is broken.

### Option 2: Use with `npx` (no global install)

```bash
npx uuid-mcp
```

Same behavior. Zero commitment.

## Claude Code setup

Claude Code does not auto-discover MCP servers. You must register it manually.

### Install the Package
You can use this package without installing it globally by using npx, or install it globally for faster access.

```bash
npm install -g @abhishekrj02/uuid-mcp
```

### Add to Claude Code

For Windows Users
```bash
claude mcp add uuid-mcp -- cmd /c npx -y @abhishekrj02/uuid-mcp
```

For macOS/Linux Users
```bash
claude mcp add uuid-mcp -- npx -y @abhishekrj02/uuid-mcp
```

### Verify Installation
```bash
claude mcp list
```

### Use It
Start a Claude Code session:
```bash
claude
```

Then simply ask Claude to generate a UUID:
```bash
Can you generate a UUID for me?
```

Claude will use the MCP server to generate a random UUID.

## Claude Desktop setup

Claude Desktop does not auto-discover MCP servers. You must register it manually.

### Config file location

macOS / Linux
```bash
~/.config/claude-desktop/claude_desktop_config.json
```

Windows
```bash
%APPDATA%\Claude\claude_desktop_config.json
```

Add this:
```json
{
  "mcpServers": {
    "uuid": {
      "command": "uuid-mcp"
    }
  }
}
```

Restart Claude Desktop after saving.

## Usage in Claude

Once configured, ask Claude: *Generate a UUID*

Claude will:

  1. Call the generate_uuid MCP tool

  2. Receive a UUID

  3. Return it to you

Exposed tools: `generate_uuid`

Generates a random UUID using Node.js crypto.

Output:
```bash
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

That’s it. No metadata spam.

## Development

Clone and build:
```bash
npm install
npm run build
```

Run locally:
```bash
node build/index.js
```

