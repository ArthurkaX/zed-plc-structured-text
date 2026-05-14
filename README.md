# PLC Structured Text for Zed

IEC 61131-3 Structured Text language support for the Zed editor, focused on CODESYS-style PLC projects.

This extension provides Tree-sitter based syntax highlighting for Structured Text source files. It is intended for `.st` and `.iecst` code used in IEC 61131-3 PLC development, especially CODESYS-oriented projects and exports.

## Features

- Syntax highlighting for IEC 61131-3 Structured Text.
- Focus on CODESYS-style `.st` / `.iecst` files.
- Highlighting for declarations, functions, function blocks, variables, built-in types, literals, operators, comments, and common control-flow keywords.
- Bracket matching and basic indentation.
- No language server in the first release.

## Scope

This extension is for Structured Text, not a full vendor-specific PLC IDE replacement.

Current focus:

- CODESYS-style IEC 61131-3 Structured Text.
- `.st` and `.iecst` files.
- Syntax highlighting and editor ergonomics.

Not included yet:

- LSP features such as go-to-definition, diagnostics, rename, or symbol resolution.
- Siemens SCL-specific syntax as a separate first-class language.
- Project parsing for full PLC application structures.

Siemens SCL may look similar to Structured Text, but it has vendor-specific syntax and conventions. Dedicated SCL support should be handled separately.

## Grammar

The Zed extension uses a separate Tree-sitter grammar repository.

For local development, `extension.toml` currently points to a local grammar repo:

```toml
repository = "file:///C:/Workspace/Active/tree-sitter-structured-text"
```

Before publishing to the Zed Extension Store, replace this with a public HTTPS grammar repository and pin a commit SHA.

## Local Development

Install this repository as a dev extension in Zed:

1. Open the command palette.
2. Run `zed: install dev extension`.
3. Select this repository directory.

If the grammar was rebuilt or the grammar repository changed, run `Rebuild` from the Zed extensions UI or reinstall the dev extension.

## License

MIT
