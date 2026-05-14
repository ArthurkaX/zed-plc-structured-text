# PLC Structured Text for Zed

Structured Text language support for Zed.

## Features

- Syntax highlighting for IEC 61131-3 Structured Text via Tree-sitter.
- File support for `.st` and `.iecst`.
- Bracket matching, basic indentation, and outline entries for programs and actions.
- No language server in the first release.

## Grammar

This extension uses a separate Tree-sitter grammar repository.

For local development, `extension.toml` points to:

```toml
repository = "file:///C:/Workspace/Active/tree-sitter-structured-text"
```

Before publishing to the Zed Extension Store, replace this with a public HTTPS grammar repository and pin a commit SHA.

## Local Development

Install this repository as a dev extension in Zed:

1. Open the command palette.
2. Run `zed: install dev extension`.
3. Select this repository directory.

## License

MIT
