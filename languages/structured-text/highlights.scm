; Definitions

(program_definition
  programName: (identifier) @title)

(action_definition
  ActionName: (identifier) @title)

(function_definition
  functionName: (identifier) @title)

(function_definition
  "END_FUNCTION" @keyword)

(function_block_definition
  functionBlockName: (_) @title)

(function_block_definition
  "END_FUNCTION_BLOCK" @keyword)

(function_block_definition
  baseType: (_) @type)

(type_definition
  typeName: (identifier) @type)

(type_definition
  type: (derived_data_type) @type)

(enum_value
  name: (identifier) @constant)

(variable_declaration_item
  name: (identifier) @variable)

(variable_declaration_item
  address: (direct_address) @constant.builtin)

(variable_declaration_item
  type: (derived_data_type) @type)

(variable_declaration_item
  type: (basic_data_type) @type.builtin)

(variable_declaration_item
  type: (array_type) @type)

(variable_declaration_item
  type: (string_type) @type.builtin)

(variable_declaration_item
  type: (pointer_type) @type)

; Calls and variables

(call_expression
  functionName: (identifier) @function)

(call_expression
  functionName: (variable) @function)

(parameter) @variable.parameter

(variable
  name: (identifier) @variable)

(structure_member
  (identifier) @property)

((identifier) @attribute
  (#match? @attribute "^(attribute|S7_|External|InstructionName|LibVersion|SetPoint|Accessible|Visible|Writable)"))

(structure_member
  "." @punctuation.delimiter)

((variable
  name: (identifier) @type
  (structure_member
    (identifier) @constant))
  (#match? @type "^E_")
)

; Types

(basic_data_type) @type.builtin
(derived_data_type) @type
(string_type) @type.builtin
(pointer_type) @type

[
  "BOOL"
  "BYTE"
  "DATE"
  "DATE_AND_TIME"
  "DT"
  "DINT"
  "DWORD"
  "INT"
  "LINT"
  "LREAL"
  "LWORD"
  "REAL"
  "SINT"
  "STRING"
  "TIME"
  "TIME_OF_DAY"
  "TOD"
  "UDINT"
  "UINT"
  "ULINT"
  "USINT"
  "WORD"
  "WSTRING"
] @type.builtin

((identifier) @type.builtin
  (#match? @type.builtin "^(BOOL|Bool|BYTE|Byte|WORD|Word|DWORD|DWord|LWORD|LWord|SINT|SInt|USINT|USInt|INT|Int|UINT|UInt|DINT|DInt|UDINT|UDInt|LINT|LInt|ULINT|ULInt|REAL|Real|LREAL|LReal|TIME|Time|LTIME|LTime|DATE|Date|TIME_OF_DAY|TOD|DATE_AND_TIME|DT|CHAR|Char|WCHAR|WChar|STRING|String|WSTRING|WString)$"))

((identifier) @type
  (#match? @type "^(R_TRIG|F_TRIG|TON|TOF|TP|TON_TIME|CTU|CTD|CTUD|SR|RS)$"))

; Literals

(boolean) @boolean

[
  (integer)
  (floating_point)
  (binary)
  (octal)
  (hexidecimal)
] @number

[
  (time)
  (date)
  (time_of_day)
  (date_and_time)
] @constant.builtin

[
  (string)
  (wstring)
] @string

; Comments

[
  (inline_comment)
  (block_comment)
] @comment

; Keywords

[
  "ACTION"
  "ARRAY"
  "AT"
  "BY"
  "CASE"
  "CONSTANT"
  "DO"
  "ELSE"
  "ELSIF"
  "END_ACTION"
  "END_CASE"
  "END_FUNCTION"
  "END_FUNCTION_BLOCK"
  "END_FOR"
  "END_IF"
  "END_PROGRAM"
  "END_REPEAT"
  "END_STRUCT"
  "END_TYPE"
  "END_VAR"
  "END_WHILE"
  "EXTENDS"
  "FOR"
  "FUNCTION"
  "FUNCTION_BLOCK"
  "IF"
  "OF"
  "POINTER"
  "PROGRAM"
  "REPEAT"
  "RETURN"
  "STRUCT"
  "THEN"
  "TO"
  "TYPE"
  "UNTIL"
  "VAR"
  "VAR_GLOBAL"
  "VAR_INPUT"
  "VAR_IN_OUT"
  "VAR_OUTPUT"
  "VAR_TEMP"
  "WHILE"
] @keyword

((identifier) @keyword
  (#match? @keyword "^(ACTION|ARRAY|BEGIN|BY|CASE|CONFIGURATION|CONSTANT|CONTINUE|DATA_BLOCK|DO|ELSE|ELSIF|END_ACTION|END_CASE|END_CONFIGURATION|END_DATA_BLOCK|END_FOR|END_FUNCTION|END_FUNCTION_BLOCK|END_IF|END_INTERFACE|END_METHOD|END_NAMESPACE|END_ORGANIZATION_BLOCK|END_PROGRAM|END_REPEAT|END_STRUCT|END_TYPE|END_UNION|END_VAR|END_WHILE|EXIT|FOR|FUNCTION|FUNCTION_BLOCK|IF|IMPLEMENTS|INITIAL_STEP|INTERFACE|JMP|METHOD|NAMESPACE|OF|ORGANIZATION_BLOCK|PERSISTENT|PROGRAM|REPEAT|RESOURCE|RETAIN|RETURN|STEP|STRUCT|THEN|TO|TRANSITION|TYPE|UNION|UNTIL|VAR|VAR_CONFIG|VAR_GLOBAL|VAR_INPUT|VAR_IN_OUT|VAR_OUTPUT|VAR_TEMP|VERSION|WHILE)$"))

((identifier) @keyword
  (#match? @keyword "^(array|Array|of|Of)$"))

((identifier) @label
  (#match? @label "^__[A-Za-z_][A-Za-z0-9_]*$"))

((identifier) @variable
  (#match? @variable "^(b|by|di|dw|e|f|i|if|lr|lw|n|p|r|s|st|udi|ui|u|w|x)[A-Z_][A-Za-z0-9_]*$"))

((identifier) @comment.special
  (#match? @comment.special "^(REGION|END_REGION)$"))

[
  "AND"
  "MOD"
  "NOT"
  "OR"
  "XOR"
] @keyword.operator

((identifier) @keyword.operator
  (#match? @keyword.operator "^(AND|MOD|NOT|OR|XOR)$"))

; Operators and punctuation

[
  ":="
  "+"
  "-"
  "*"
  "**"
  "/"
  "<"
  ">"
  "<="
  ">="
  "="
  "<>"
  ".."
] @operator

(pointer_dereference) @operator

[
  ":"
  ";"
  ","
] @punctuation.delimiter

[
  "("
  ")"
  "["
  "]"
] @punctuation.bracket
