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

The Zed extension uses a separate Tree-sitter grammar repository:

https://github.com/ArthurkaX/tree-sitter-structured-text

The grammar is pinned in `extension.toml`:

```toml
repository = "https://github.com/ArthurkaX/tree-sitter-structured-text.git"
rev = "f5dfc65b0d12cb1e20e5499c1f34846d18167f1c"
```

## Local Development

Install this repository as a dev extension in Zed:

1. Open the command palette.
2. Run `zed: install dev extension`.
3. Select this repository directory.

If the grammar was rebuilt or the grammar repository changed, run `Rebuild` from the Zed extensions UI or reinstall the dev extension.

## Related Project

This extension was created alongside [`cds-text-sync`](https://github.com/ArthurkaX/cds-text-sync), a CODESYS-oriented text synchronization tool for PLC projects.

## License

MIT
