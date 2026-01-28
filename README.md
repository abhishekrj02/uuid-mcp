# shift-lite-mcp

A minimal utility server built for the Model Context Protocol (MCP).


## Features
- 🔌 Easy integration with Claude Desktop and Claude Code
- ⚡ Lightweight and fast
- 🛠️ Built with TypeScript

## Installation

### Option 1: Install globally (simple, persistent)

```bash
npm install -g @abhishekrj02/shift-lite-mcp
```

Verify it works:
```bash
shift-lite-mcp
```

You should see:
```bash
Shift-lite MCP Server running on stdio
```


## Claude Code setup

Claude Code does not auto-discover MCP servers. You must register it manually.

### Install the Package
You can use this package without installing it globally by using npx, or install it globally for faster access.

```bash
npm install -g @abhishekrj02/shift-lite-mcp
```

### Add to Claude Code

For Windows Users
```bash
claude mcp add shift-lite-mcp -- cmd /c npx -y @abhishekrj02/shift-lite-mcp
```

For macOS/Linux Users
```bash
claude mcp add shift-lite-mcp -- npx -y @abhishekrj02/shift-lite-mcp
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
    "shift-lite-mcp": {
      "command": "shift-lite-mcp"
    }
  }
}
```

Restart Claude Desktop after saving.

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

