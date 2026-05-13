# PLC Structured Text for Zed

Structured Text language support for Zed.

## Features

- Syntax highlighting for IEC 61131-3 Structured Text via Tree-sitter.
- File support for `.st` and `.iecst`.
- Bracket matching, basic indentation, and outline entries for programs and actions.
- No language server in the first release.

## Grammar

This extension uses the MIT-licensed [`tree-sitter-structured-text`](https://github.com/tmatijevich/tree-sitter-structured-text) grammar.

## Local Development

Install this repository as a dev extension in Zed:

1. Open the command palette.
2. Run `zed: install dev extension`.
3. Select this repository directory.

## License

MIT
